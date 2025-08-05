/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";

interface Course {
  type: 1 | 2 | 3;
  course_id: string;
  title: string;
  image: string;
  instructors: [] | { name: string; photo: string }[];
  instructor_role: string;
  label: string;
}

const Type = { 1: "PREMIUM", 2: "BASIC", 3: "FREE" };

const UserPage = () => {
  const { user } = useParams();
  const router = useRouter();

  const [data, setData] = useState<Course[]>([]);

  const handleGetUser = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${user}/courses/active`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      const result = await response.json();
      setData(result.data);
    } catch (error: any) {
      console.error(error.message);
    }
  }, [user]);

  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>Kelas ({data.length})</h2>
      <div className={styles.grid}>
        {data?.map((item, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} />
              <span className={styles.badge}>{index + 1}</span>
              <span className={styles.tag}>{Type[item.type]}</span>
            </div>
            <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <div className={styles.trainer}>
                <img src={item.instructors[0].photo} alt={item.title} />
                <p>
                  {item.instructors[0].name} <br />
                  <span className={styles.trainerLabel}>
                    {item.instructor_role}
                  </span>
                </p>
              </div>
              <button
                className={styles.btn}
                onClick={() => router.push(`/${user}/${item.course_id}`)}
              >
                Lanjut
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
