"use client";

import {
  deleteStudentAsync,
  getAllStudentsByGroupAsync,
  selectGroupName,
  selectIsLoading,
  selectStudents,
} from "@/lib/features/student/studentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button, Spinner, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast, Bounce, ToastContainer } from "react-toastify";

const SingleGroup = ({ groupId }: { groupId: number }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);
  const groupName = useAppSelector(selectGroupName);
  const isLoading = useAppSelector(selectIsLoading);
  const [isDeleted, setIsDeleted] = useState(false);
  console.log(isLoading);

  useEffect(() => {
    dispatch(getAllStudentsByGroupAsync(groupId));
    setIsDeleted(false);
  }, [isDeleted]);

  const handleDelete = (id: number) => {
    dispatch(deleteStudentAsync(id))
      .unwrap()
      .then((resp) => {
        if (resp.success) {
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
        }
      });
    setTimeout(() => {
      setIsDeleted(true);
    }, 2000);
  };
  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading...</p>
          <p className="mt-5">
            <Spinner
              color="purple"
              aria-label="Purple spinner example"
              size="xl"
            />
          </p>
        </div>
      ) : (
        <section className="container">
          <ToastContainer />
          <div className="flex justify-start">
            <Button onClick={() => router.back()} className="mb-7">
              Back
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>
                  <MdOutlineFormatListNumbered className="font-bold text-lg text-green-900" />
                </Table.HeadCell>
                <Table.HeadCell>Student Name</Table.HeadCell>
                <Table.HeadCell>Student Surname</Table.HeadCell>
                <Table.HeadCell>Group Name</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {students?.map((student, i) => (
                <Table.Body className="divide-y" key={student.id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {i + 1}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {student.surname}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {groupName}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        outline
                        gradientDuoTone="redToYellow"
                        theme={{
                          gradientDuoTone: {
                            redToYellow:
                              "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-red-400 focus:ring-4 focus:ring-red-100 enabled:hover:bg-gradient-to-bl dark:focus:ring-red-400",
                          },
                        }}
                        className="font-medium  hover:underline dark:text-cyan-500"
                        onClick={() => handleDelete(Number(student.id))}
                      >
                        <span className="text-red-400 hover:text-red-600">
                          <RiDeleteBin2Line className="inline-block mr-2 text-lg" />
                          Delete
                        </span>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleGroup;
