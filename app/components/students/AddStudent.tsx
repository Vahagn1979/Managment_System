"use client";

import { IStudent } from '@/app/types/IStudent'
import { IGroup } from '@/app/types/Igroup';
import { studentsSchema } from '@/app/validation/studentsSchema';
import { getAllGroupsAsync, selectGroups, selectStatus } from '@/lib/features/group/groupSlice';
import { addNewStudentAsync } from '@/lib/features/student/studentSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FloatingLabel, Button, Label, Select, Spinner } from 'flowbite-react'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast, Bounce, ToastContainer } from 'react-toastify';

const AddStudent = () => {
  const router= useRouter();
    const dispatch = useAppDispatch();
    const groups = useAppSelector(selectGroups);
    const status = useAppSelector(selectStatus);

    useEffect(() => {
        dispatch(getAllGroupsAsync())
    }, [])
    

    const handleAddStudent = (values: IStudent, {resetForm} : {resetForm: Function}) => {
        console.log(values);
        const body: IStudent = {
          id: Date.now(),
          groupId: Number(values.groupId),
          name: values.name,
          surname: values.surname
        }
        dispatch(addNewStudentAsync(body)).unwrap()
                    .then((resp) => {
                      if(resp.error) {
                        // alert(resp.error)
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
                        // alert(resp.success);
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
                          surname: "",
                          groupId: ""
                        });
                        setTimeout(() => {
                          router.push(`/group/${values.groupId}`)
                        }, 0)
                      }
                    })
    }

  return (
    <>
    {(status === "loading") ?
      <p>
        Loading...
        <Spinner color="purple" aria-label="Purple spinner example" />
      </p> :
      <section className='container'>
        <ToastContainer />
          <h1 className="text-2xl text-teal-700">Add a New Student</h1>
          <div>
              <Formik
                  initialValues={{
                      name: "",
                      surname: "",
                      groupId: ""
                  } as IStudent}
                  onSubmit={handleAddStudent}
                  validationSchema={studentsSchema}
              >
                  {({
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      values
                  }) => {
                      return (
                          <form className="flex max-w-md flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
                          <div>
                            <FloatingLabel
                              variant="outlined"
                              label={(errors.name && touched.name) ? "Student Name Required" : "Student Name"}
                              color={(errors.name && touched.name) ? "error" : "success"}
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
                              label={(errors.surname && touched.surname) ? "Student Surname Required" : "Student Surname"}
                              color={(errors.surname && touched.surname) ? "error" : "success"}
                              type="text"
                              name="surname"
                              value={values.surname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="max-w-md">
                              <div className="mb-2 block">
                                  <Label 
                                    htmlFor="group" 
                                    value="Select student group" 
                                    className={(errors.groupId && touched.groupId) ? 'text-red-600' : 'text-cyan-600'}
                                  />
                              </div>
                              <Select 
                                id="group" 
                                color={(errors.groupId && touched.groupId) ? "failure" : "success"}
                                name='groupId'
                                value={values.groupId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="" className='text-fuchsia-600 font-semibold mb-3 bg-blue-300'>{(errors.groupId && touched.groupId) ? "Required field: Group Name!" : "Group Names"}</option>
                                  {groups?.map((group: IGroup) => (
                                      <option value={group.id} key={group.id}>{group.name}</option>
                                  ))}
                              </Select>
                          </div>
                          <Button type="submit">Add a new student</Button>
                        </form>
                      )
                  }}
              </Formik>
          </div>
      </section>}
    </>
  )
}

export default AddStudent