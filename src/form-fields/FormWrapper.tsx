import React, { Ref } from 'react';
import { FormProvider, UseFormReturn, SubmitHandler, FieldValues } from 'react-hook-form';

interface Props<TFormValue extends FieldValues> {
  methods: UseFormReturn<TFormValue, any>;
  onSubmit: SubmitHandler<TFormValue>;
  children?: React.ReactNode;
  formRef?: Ref<HTMLFormElement>
}

const FormWrapper = <TFormValue extends FieldValues,>({ methods, onSubmit, children, formRef }: Props<TFormValue>) => {
  return (
    <FormProvider {...methods}>
      <form style={{ width: '100%' }} ref={formRef} onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;
