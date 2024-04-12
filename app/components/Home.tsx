"use client";

import {
  getAllGroupsAsync,
  selectGroups,
  selectStatus,
} from "@/lib/features/group/groupSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Card, Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const status = useAppSelector(selectStatus);
  const [loading, setLoading] = useState(false);
  const [activeGroup, setActivegroup] = useState<number | null>(null)

  useEffect(() => {
    dispatch(getAllGroupsAsync());
  }, []);

  return (
    <>
      {status === "loading" ? (
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
          <h1 className="text-2xl text-teal-700 mb-5 font-semibold">
            Education Centre Page
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            {groups?.map((group, i) => (
              <Card className="max-w-sm shadow-md" key={group.id}>
                <div>
                  <span className="border rounded-full px-2 bg-slate-100 text-lg font-semibold">
                    {i + 1}
                  </span>
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Educational Center 2024
                </h5>
                <div>
                  <h5 className="text-teal-600 font-bold inline-block">
                    Group Name:{" "}
                    <span className="ml-3 text-orange-500">{group.name}</span>
                  </h5>
                  <h5 className="text-teal-600 font-bold ">
                    Number of Students:{" "}
                    <span className="ml-3 text-purple-800">
                      {group.studentCount}
                    </span>
                  </h5>
                  <h5 className="text-teal-600 font-bold ">
                    Limit:{" "}
                    <span className="ml-3 text-red-800">{group.maxCount}</span>
                  </h5>
                </div>
                <Button
                  onClick={() => {
                    router.push(`/group/${group.id}`);
                    setLoading(true);
                    setActivegroup(i);
                  }}
                >
                  {loading && (activeGroup === i) && (
                    <Spinner aria-label="Spinner button example" size="sm" />
                  )}
                  Go To Personal Page
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
