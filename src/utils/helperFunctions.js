import { collection, addDoc, doc, getDocs, setDoc, updateDoc, onSnapshot, getDoc, runTransaction } from 'firebase/firestore';
import { database } from '../../firebaseConfig'; // Import your Firebase configuration
import { toast } from "react-toastify";

export async function getUserData(userID, userDataSetterFn, setFetchedData) {

    try {
        const userDocRef = doc(database, 'Users', userID);
        const initialSnapshot = await getDoc(userDocRef);
        const initialUserData = initialSnapshot.data();
        // Set initial data
        userDataSetterFn(initialUserData);
        setFetchedData((prevData) => ({
            ...prevData,
            ['userData']: initialUserData,
        }));
        // Set up real-time listener for changes
        const unsubscribeUserInfo = onSnapshot(userDocRef, (snapshot) => {
            const fetchedUserData = snapshot.data();
            userDataSetterFn(fetchedUserData);
            setFetchedData((prevData) => ({
                ...prevData,
                ['userData']: fetchedUserData,
            }));

            setFetchedData((prevData) => ({
                ...prevData,
                ['cartArray']: fetchedUserData.cart,
                ['favouritesArray']: fetchedUserData.favourites,
                ['paymentArray']: fetchedUserData.financing,
                ['paymentCompleteArray']: fetchedUserData.paymentCompletedArray,
            }));


        })
        // Cleanup the listener when the component unmounts or as needed
        return () => unsubscribeUserInfo();
    } catch (error) {
        console.log('Error fetching data:', error, error.code, error.message);
    }
}


export function formatNumberWithCommas(value) {
    // Check if value is defined and not null
    if (value !== undefined && value !== null) {
        // Convert the number to a string
        let numberString = value.toString();
        // Use a regular expression to add commas
        numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numberString;
    }
    // Return a default value or handle the case when value is undefined or null
    return "N/A";
}






export async function fetchProductDataById(docId, setterFunction, setMainImage, databaseName) {
    // console.log("values in fetch product by id: " + { docId, setterFunction, setMainImage, databaseName })
    try {
        // Reference to the specific Firestore document using its ID
        const documentRef = doc(database, databaseName, docId); // Replace 'YourCollectionName' with the actual name of your collection
        // Initial value
        const initialSnapshot = await getDoc(documentRef);
        const initialUserData = initialSnapshot.data();
        setterFunction(initialUserData)
        setMainImage(initialUserData.imageGalleryImages[0].imageURL)
        // Using onSnapshot to listen for real-time updates for the specific document
        const unsubscribe = onSnapshot(documentRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setterFunction(data)
                // console.log('fetchProductDataById data ', data)
                setMainImage(data.imageGalleryImages[0].imageURL)

            } else {
                console.log('Document does not exist');
                // Handle the case where the document does not exist
            }
        });

        // Return the unsubscribe function for cleanup
        return unsubscribe;
    } catch (error) {
        console.error('Error fetching data by ID:', error);
    }
}


export function generateRandomID(userIdLength = 20) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';

    for (let i = 0; i < userIdLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomID += characters.charAt(randomIndex);
    }
    // console.log("randomID: ", randomID);
    return randomID;
}

export async function getCurrentDateTime() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}



export async function addReview(userID, productId, newReview, setReview, collectionString) {
    const dataCollectionReference = collection(database, `${collectionString}`);
    const reviewID = generateRandomID()
    const reviewUploadDate = await getCurrentDateTime()
    console.table(userID, productId, newReview)
    const productDocRef = doc(dataCollectionReference, productId);  // Replace 'yourFirestoreCollectionReference' with your actual reference
    try {
        // Get the current data of the document
        const productDocSnapshot = await getDoc(productDocRef);
        const productData = productDocSnapshot.data();
        // Update the reviews array
        const updatedReviews = [...productData.reviews, { userId: userID, reviewId: reviewID, review: newReview, date: reviewUploadDate }];
        // Update the Firestore document with the new reviews array
        await updateDoc(productDocRef, { reviews: updatedReviews });
        // console.log('Review added successfully!');
        toast.success(`Review added successfully`);
        setReview('')
    } catch (error) {
        console.log('Error adding review:', error, error.code, error.message);
        toast.error(error.message);
    }
}



export async function deleteReview(productID, reviewItemID, collectionString) {
    // console.log("productID ", productID)
    // console.log("reviewItemID ", reviewItemID)
    try {
        const docRef = doc(database, `${collectionString}`, productID);
        const documentData = await getDoc(docRef);

        if (documentData.exists()) {
            const reviewsArray = documentData.data().reviews;
            console.log(reviewsArray)
            // Filter out the review with the given reviewID
            const updatedReviews = reviewsArray.filter((review) => review.reviewId !== reviewItemID);
            // console.log(updatedReviews)
            // Update the document with the modified reviews array
            await updateDoc(docRef, { reviews: updatedReviews });
            toast.success(`Review deleted successfully`);
            // console.log('Review deleted successfully.');
        } else {
            console.error(`Product with ID ${productID} not found.`);
        }
    } catch (error) {
        console.error('Error deleting review:', error);
    }
}





export async function addItemsToCart(productId, productQuantity = 1, userID, setAddToCartQty = undefined, collectionStringValue) {
    // console.log(productId, productQuantity, userID);
    let cartItemID = generateRandomID(20);
    try {
        const productDocRef = doc(database, collectionStringValue, productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                const productData = productDocSnapshot.data();
                const updatedQty = Math.max(productData.qty - productQuantity, 0);

                // Update product quantity in stock
                transaction.update(productDocRef, { qty: updatedQty });

                // Get existing cart array or create new if it doesn't exist
                const existingCart = currentUserSnapshot.data().cart || [];

                // Add the product to the cart based on productQuantity
                for (let i = 0; i < productQuantity; i++) {

                    const cartItem = {
                        ...productData,
                        cartItemID,
                        productID: productId,
                        collectionString: collectionStringValue
                    };
                    delete cartItem.qty; // Remove quantity from cart item

                    // Remove unnecessary fields from cart item
                    delete cartItem.link;
                    delete cartItem.reviews;
                    delete cartItem.userFavourited;
                    delete cartItem.description;

                    // Remove last three images from image gallery
                    cartItem.imageGalleryImages = cartItem.imageGalleryImages.slice(0, -3);

                    existingCart.push(cartItem);
                }

                // Filter out any null or non-object elements from the cart array
                const filteredCart = existingCart.filter(item => typeof item === 'object' && item !== null);

                // Update user document with modified cart
                transaction.update(currentUserRef, { cart: filteredCart });

                // Call the setter function if provided
                if (setAddToCartQty) {
                    setAddToCartQty(1);
                }

                // Success message
                toast.success(`${productQuantity} item(s) added to cart`);

                // If the product is out of stock
                if (updatedQty === 0) {
                    toast.info(`Current stock has been depleted. Please come back later.`);
                }
            } else {
                // User or product not found
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        // Handle any errors
        console.error('Error updating product data:', error);
        toast.error(`Failed to add item to cart: ${error.message}`);
    }
}

export async function removeItemFromCart(productCollectionString, productID, cartItemID, userID) {
    // console.log("productID ", productID)
    // console.log("cartItemID ", cartItemID)
    // console.log("userID ", userID)
    try {
        const userRef = doc(database, 'Users', userID);
        const productRef = doc(database, `${productCollectionString}`, productID);
        const userDocumentData = await getDoc(userRef);
        const productDocumentData = await getDoc(productRef);
        // console.log("productDocumentData ", productDocumentData)

        if (userDocumentData.exists() && productDocumentData.exists()) {
            const cartArray = userDocumentData.data().cart;
            console.table("cartArray ", cartArray)

            // Filter out the review with the given reviewID
            const updatedCart = cartArray.filter((cartItem) => cartItem.cartItemID !== cartItemID);
            console.table("updatedReviews ", updatedCart)

            // Update the document with the modified reviews array
            await updateDoc(userRef, { cart: updatedCart });
            await updateDoc(productRef, { qty: productDocumentData.data().qty + 1 })

            toast.success(`Item removed from cart successfully`);
            // console.log('Item removed from cart successfully.');
        } else {
            console.error(`Product with ID ${productID} not found.`);
        }
    } catch (error) {
        console.error('Error deleting cart item :', error);
    }
}



export async function addItemsToFavourites(productId, userID, setProductFavouriteID, collectionString) {
    // console.log(productId, userID);

    try {
        const productDocRef = doc(database, `${collectionString}`, productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                // Get the existing array from the document
                let existingArray = currentUserSnapshot.data().favourites || [];
                let productuserFavourites = productDocSnapshot.data().userFavourited
                const favouriteItemID = generateRandomID();
                const productID = productId
                const favouriteItem = { ...productDocSnapshot.data(), favouriteItemID, productID };
                delete favouriteItem.link;
                delete favouriteItem.reviews;
                delete favouriteItem.description;
                delete favouriteItem.userFavourited;
                existingArray.push(favouriteItem);
                productuserFavourites.push(userID)
                if (setProductFavouriteID) {
                    setProductFavouriteID(favouriteItemID) // or pass the cartitemId
                }
                // Update the document with the modified array
                await updateDoc(currentUserRef, { favourites: existingArray });
                await updateDoc(productDocRef, { userFavourited: productuserFavourites });
                toast.success(`Item added to favourites`);

            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating product data:', error);
        console.log(error.message);
        toast.error(`Failed to add Item to Cart ${error.message}`);
    }
}

export async function addPopularItemsToFavourites(productId, userID, setProductFavouriteID) {
    // console.log(productId, userID);

    try {
        const productDocRef = doc(database, 'PopularProducts', productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                // Get the existing array from the document
                let existingArray = currentUserSnapshot.data().favourites || [];
                let productuserFavourites = productDocSnapshot.data().userFavourited
                const favouriteItemID = generateRandomID();
                const productID = productId
                const favouriteItem = { ...productDocSnapshot.data(), favouriteItemID, productID };
                delete favouriteItem.qty;
                delete favouriteItem.link;
                delete favouriteItem.reviews;
                delete favouriteItem.description;
                delete favouriteItem.userFavourited;
                existingArray.push(favouriteItem);
                productuserFavourites.push(userID)
                if (setProductFavouriteID) {
                    setProductFavouriteID(favouriteItemID) // or pass the cartitemId
                }


                // Update the document with the modified array
                await updateDoc(currentUserRef, { favourites: existingArray });
                await updateDoc(productDocRef, { userFavourited: productuserFavourites });
                toast.success(`Item added to favourites`);

            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating product data:', error);
        console.log(error.message);
        toast.error(`Failed to add Item to Cart ${error.message}`);
    }
}


export async function removeItemFromFavourites(productId, userID, collectionString) {
    // console.log(productId, userID);

    try {
        const productDocRef = doc(database, `${collectionString}`, productId);
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);
            const productDocSnapshot = await getDoc(productDocRef);

            if (currentUserSnapshot.exists() && productDocSnapshot.exists()) {
                // Get the existing array from the document
                let userFavouritesArray = currentUserSnapshot.data().favourites;
                let productuserFavourites = productDocSnapshot.data().userFavourited

                let newUserFavouritesArray = userFavouritesArray.filter((product) => product.productID !== productId)
                let newProductUserFavouritedArray = productuserFavourites.filter((id) => id !== userID)

                // Update the document with the modified array
                await updateDoc(currentUserRef, { favourites: newUserFavouritesArray });
                await updateDoc(productDocRef, { userFavourited: newProductUserFavouritedArray });
                toast.success(`Item removed from favourites`);

            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating cart data:', error);
        console.log(error.message);
        toast.error(`Failed to remove Item from Cart ${error.message}`);
    }
}


export async function fetchProductsData(setData, collectionName, key) {
    try {
        const dataCollectionRef = collection(database, collectionName);

        // Fetch the data once using getDocs
        const dataCollectionSnapshot = await getDocs(dataCollectionRef);

        // Extract data from the snapshot
        const dataArray = dataCollectionSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });

        // Set the initial value of the collection
        setData((prevData) => ({
            ...prevData,
            [key]: dataArray,
        }));

        // Using onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(dataCollectionRef, (querySnapshot) => {
            // Extract data from each document in the collection
            const updatedDataArray = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                // Include the ID in the object
                return { id: doc.id, ...data };
            });

            // Dispatch the updated array of data to your state
            setData((prevData) => ({
                ...prevData,
                [key]: updatedDataArray,
            }));
        });

        // Return the unsubscribe function for cleanup
        return unsubscribe;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


export async function getUserFinancingData(userID, userDataSetterFn, cartDataSetterFn = null, favouritesSetterFn = null) {
    // console.log("userID: ", userID)


    try {
        const userDocRef = doc(database, 'Users', userID);
        // Fetch initial data
        const initialSnapshot = await getDoc(userDocRef);
        const userFinancingArray = initialSnapshot.data().financing;
        // console.log("initialUserData ", userFinancingArray)
        // Set initial data
        userDataSetterFn(userFinancingArray);
        // Set up real-time listener for changes
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const fetchedUserData = snapshot.data();
            // console.log("fetchedUserData ", fetchedUserData)
            userDataSetterFn(fetchedUserData);
            if (cartDataSetterFn !== null && favouritesSetterFn !== null) {
                cartDataSetterFn(fetchedUserData.cart)
                favouritesSetterFn(fetchedUserData.favourites)
            }
        });
        // Cleanup the listener when the component unmounts or as needed
        return () => unsubscribe();
    } catch (error) {
        console.log('Error fetching data:', error, error.code, error.message);
    }
}




export async function updateFinancingItemPrice(orderID, amountPayable, userID, paymentReciever) {
    // console.log(orderID, amountPayable, userID);

    try {
        const currentUserRef = doc(database, 'Users', userID);

        await runTransaction(database, async (transaction) => {
            const currentUserSnapshot = await getDoc(currentUserRef);

            if (currentUserSnapshot.exists()) {
                // Get the existing array from the document
                let existingArray = currentUserSnapshot.data().financing || [];
                let paymentCompletedArr = currentUserSnapshot.data().paymentCompletedArray || [];

                // Find the item in the array with the matching orderID
                const itemToUpdate = existingArray.find(order => order.orderId === orderID);

                if (itemToUpdate) {
                    // Update the leftToPay value of the found item
                    if (itemToUpdate.leftToPay - amountPayable === 0) {
                        // console.log("paymentCompletedArr ", paymentCompletedArr)
                        paymentCompletedArr.push(itemToUpdate)
                        // console.log("paymentCompletedArr after push", paymentCompletedArr)
                        existingArray = existingArray.filter(order => order.orderId !== orderID)
                        await updateDoc(currentUserRef, { paymentCompletedArray: paymentCompletedArr });
                        await updateDoc(currentUserRef, { financing: existingArray });

                    }
                    else {
                        itemToUpdate.leftToPay -= amountPayable;
                        // Update the document with the modified array
                        await updateDoc(currentUserRef, { financing: existingArray });
                    }
                    toast.success(`Your payment of ₦${formatNumberWithCommas(amountPayable)} to ${paymentReciever} was made successfully`);
                } else {
                    console.log("Item with the given orderID not found");
                    toast.error(`Item with the given orderID not found`);
                }
            } else {
                console.log("Document not found");
                toast.error(`Document not found`);
            }
        });
    } catch (error) {
        console.error('Error updating cart item price:', error);
        toast.error(`Failed to update LeftToPay value: ${error.message}`);
    }
}

export function calculateTotalPrice(basket) {
    const totalPrice = basket?.reduce((accumulator, currentValue) => {
        // Add the price of the current object to the accumulator
        // console.log("total price ", accumulator + currentValue.price);
        return accumulator + currentValue.price;
    }, 0);
    return totalPrice
}



export async function removeItemFromCartOnCheckout(existingCartItems, userID, setItemsToCheckout, basket) {
    // console.log("basket ", basket);
    // console.log("existingCartItems ", existingCartItems);
    // console.log("userID ", userID);
    // const totalPriceOfBasketItems = calculateTotalPrice(basket);
    try {
        const userRef = doc(database, 'Users', userID);
        const userDocument = await getDoc(userRef);
        if (userDocument.exists()) {
            const cartArray = existingCartItems;
            const financingArray = userDocument.data().financing || [];
            console.table("cartArray ", cartArray);
            // Update the document with the modified cart and financing arrays
            const newOrderid = generateRandomID(5);
            await updateDoc(userRef, { cart: cartArray });
            await updateDoc(userRef, {
                financing: [
                    ...financingArray,
                    {
                        financingTotal: totalPriceOfBasketItems,
                        leftToPay: totalPriceOfBasketItems,
                        orderId: newOrderid.toUpperCase(),
                        orderProducts: basket
                    }
                ]
            });
            toast.success(`Item removed from cart successfully`);
        } else {
            console.error(`User with ID ${userID} not found.`);
            return []; // Return an empty array if user not found
        }
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return []; // Return an empty array in case of error
    }
}

export function extractLastName(fullName) {
    // Split the full name by whitespace
    const nameParts = fullName.split(' ');
    // Check if there are multiple parts
    if (nameParts.length > 1) {
        // If there are multiple parts, return the last part (last name)
        return nameParts[nameParts.length - 1];
    } else {
        // If there's only one part, return the whole string (last name)
        return fullName;
    }
}


export async function sendEmail(emailData) {
    // console.log("send email function was called")
    // console.log("emailData: " + JSON.stringify(emailData, null, 2))
    try {
        const response = await fetch('https://afritech-sendgrid-email-server.onrender.com/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData),
        });
        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email:', error.message, error);
    }
};

