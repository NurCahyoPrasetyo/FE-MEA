/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./learning.module.css";

const CoursesPage = () => {
  const params = useParams();
  const { user, course } = params;

  const [data, setData] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [flattenedLessons, setFlattenedLessons] = useState<any[]>([]);

  const handleGetCourse = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/course?course_id=${course}&user_id=${user}`,
        { credentials: "include" }
      );
      const result = await response.json();
      const courseData = result.data;
      setData(courseData);

      // Flatten lessons
      const flatLessons = courseData.chapters?.flatMap((chapter: any) =>
        chapter.lessons.map((lesson: any) => ({
          ...lesson,
          chapterTitle: chapter.title,
        }))
      );
      setFlattenedLessons(flatLessons);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < flattenedLessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    handleGetCourse();
  }, []);

  const currentLesson = flattenedLessons[currentLessonIndex];

  return (
    <div className={styles.container}>
      <h2>{data?.title}</h2>

      <div className={styles.videoSection}>
        <div className={styles.videoPlayer}>
          {currentLesson?.link ? (
            <iframe
              src={currentLesson.link}
              title={currentLesson.title}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <div className={styles.videoPlaceholder}>Video Player</div>
          )}
        </div>

        <div className={styles.videoNav}>
          <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
            Sebelumnya
          </button>
          <button
            onClick={handleNext}
            disabled={currentLessonIndex === flattenedLessons.length - 1}
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <div className={styles.lessonList}>
        {data?.chapters?.map((chapter: any, i: number) => (
          <div key={i} className={styles.chapter}>
            <h4>{chapter.title || `Bab ${i + 1}`}</h4>
            <ul>
              {chapter.lessons?.map((lesson: any, idx: number) => (
                <li key={lesson.lesson_id}>
                  {lesson.title || `Materi ${idx + 1}`} (
                  {lesson.link ? "Link Video" : "No Link"})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
