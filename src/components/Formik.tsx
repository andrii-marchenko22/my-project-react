// Імпортуємо вбудований тип FormikHelpers
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name too short')
    .max(50, 'Name too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  delivery: Yup.string()
    .oneOf(['pickup', 'courier', 'drone'], 'Invalid delivery method')
    .required('Delivery method is required'),
  restrictions: Yup.array().of(Yup.string()),
  deliveryTime: Yup.string().required('Select delivery time'),
  message: Yup.string()
    .min(5, 'Message too short')
    .max(300, 'Message too long'),
});

interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
  delivery: string;
  restrictions: string[];
  message: string;
}

const initialValues: OrderFormValues = {
  username: '',
  email: '',
  deliveryTime: '',
  delivery: 'pickup',
  restrictions: [],
  message: '',
};

export default function OrderForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log('Order data:', values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field type="text" name="username" />
        {/* <ErrorMessage name="username" component="span" className={css.error} /> */}
        <Field type="email" name="email" />
        {/* <ErrorMessage name="email" component="span" className={css.error} /> */}
        <button type="submit">Place order</button>

        <label htmlFor={`${fieldId}-deliveryTime`}>
          Preferred delivery time
        </label>
        <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00-12:00)</option>
          <option value="afternoon">Afternoon (12:00-16:00)</option>
          <option value="evening">Evening (16:00-20:00)</option>
          {/* <ErrorMessage name="deliveryTime" component="span" className={css.error} /> */}
        </Field>
        <label>
          <Field type="radio" name="delivery" value="pickup" />
          Pickup
        </label>
        <label>
          <Field type="radio" name="delivery" value="courier" />
          Courier
        </label>
        <label>
          <Field type="radio" name="delivery" value="drone" />
          Drone delivery
        </label>
        <label>
          <Field type="checkbox" name="restrictions" value="vegan" />
          Vegan
        </label>
        <label>
          <Field type="checkbox" name="restrictions" value="gluten-free" />
          Gluten-free
        </label>
        <label>
          <Field type="checkbox" name="restrictions" value="nut-free" />
          Nut-free
        </label>
        <label htmlFor="message">Comment or instructions</label>
        <Field as="textarea" name="message" id="message" rows={5} />
      </Form>
    </Formik>
  );
}
