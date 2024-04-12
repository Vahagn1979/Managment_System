"use client";

import { IGroup } from "@/app/types/Igroup";
import { groupSchema } from "@/app/validation/groupSchema";
import { addGroupAsync } from "@/lib/features/group/groupSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  Label,
  TextInput,
  Checkbox,
  Button,
  FloatingLabel,
} from "flowbite-react";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, Bounce, ToastContainer } from "react-toastify";

const AddGroup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddGroup = (
    values: IGroup,
    { resetForm }: { resetForm: Function }
  ) => {
    const body = {
      id: Date.now(),
      name: values.name[0].toUpperCase() + values.name.slice(1).toLowerCase(),
      maxCount: values.maxCount,
      studentCount: 0,
    };
    console.log(body);
    dispatch(addGroupAsync(body))
      .unwrap()
      .then((resp) => {
        if (resp.error) {
          toast.error(`🦄 ${resp.error}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.success(`🦄 ${resp.success}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          resetForm({
            name: "",
            maxCount: "",
          });
          setTimeout(() => {
            router.push("/")
          }, 0)
        }
      });
  };
  return (
    <section className="container ">
      <ToastContainer />
      <h1 className="text-2xl text-teal-500 my-5">Create a new group</h1>
      <div className="">
        <Formik
          initialValues={
            {
              name: "",
              maxCount: "",
            } as IGroup
          }
          onSubmit={handleAddGroup}
          validationSchema={groupSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            touched,
            errors,
          }) => {
            return (
              <form
                className="flex max-w-md flex-col gap-4 mx-auto"
                onSubmit={handleSubmit}
              >
                <div>
                  <FloatingLabel
                    variant="outlined"
                    label={
                      errors.name && touched.name
                        ? "Required Field: Group Name"
                        : "Group Name"
                    }
                    color={errors.name && touched.name ? "error" : "success"}
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <FloatingLabel
                    variant="outlined"
                    label={
                      errors.maxCount && touched.maxCount
                        ? "Required Field: Number of Students (min 2 - max 16)"
                        : "max Number of Students"
                    }
                    color={
                      errors.maxCount && touched.maxCount ? "error" : "success"
                    }
                    type="number"
                    name="maxCount"
                    value={values.maxCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <Button type="submit">Add a new group</Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
};

export default AddGroup;
