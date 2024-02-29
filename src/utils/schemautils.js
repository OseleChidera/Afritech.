import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, "Too Short!")
        .max(45, "Too Long!")
        .required("Required"),
    password: Yup.string()
        .min(8, "Too Short!")
        .max(12, "Too Long!")
        .required("Required"),
});

export const step1ValidationSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required'),
    confirm_password: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Required')
        .oneOf([Yup.ref("password")], "Passwords must match"),
})

export const step2ValidationSchema = Yup.object().shape({
    fullname: Yup.string()
        .min(2, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    phone: Yup.string()
        .min(10, 'Too Short!')
        .max(13, 'Too Long!')
        .required('Required'),
    address: Yup.string()
        .min(10, 'Too Short!')
        .max(60, 'Too Long!')
        .required('Required'),

})
export const step3ValidationSchema = Yup.object().shape({
    dateOfBirth: Yup.date()
        .required('Date is required')
        .test('valid-date', 'Cant be the current date', function (value) {
            const currentDate = new Date();
            const userDate = new Date(value);

            // Check if the date is not today's date and user is at least 18 years old
            return (
                currentDate.toDateString() !== userDate.toDateString()
            );
        })
        .test('valid-date2', 'Below 18 years of age', function (value) {
            const currentDate = new Date();
            const userDate = new Date(value);

            // Check if the date is not today's date and user is at least 18 years old
            return (
                currentDate.getFullYear() - userDate.getFullYear() > 18
            );
        }),

    bvnnumber: Yup.string()
        .min(10, 'Too Short!')
        .max(13, 'Too Long!')
        .required('Required'),
    profilePicture: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
            value && (value.type === 'image/jpeg' || value.type === 'image/png')
        ),
    ninnumber: Yup.number()
        .required('Required')
        .test("too long", (value) => value.toString().length >= 6),
    ninSlipPicture: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Image must be less than 2MB', (value) => value && value.size <= 2 * 1024 * 1024)
        .test('fileType', 'Invalid file type. Only JPG and PNG are allowed.', (value) =>
            value && (value.type === 'image/jpeg' || value.type === 'image/png')
        ),
    genderOption: Yup.string().required('Please select an option'),
    locationOption: Yup.string().required('Please select an option'),
})


