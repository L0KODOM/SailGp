import { useEffect, useState } from "react";




export const useCalculateTime = () => {
  const now = new Date()
  const month = String(now.getMonth() + 1)
  const day = String(now.getDate())
  const hour = String(now.getHours())
  const minute = String(now.getMinutes())
  const second = String(now.getSeconds())

  const finalDay = 13
  const finalMonth = 7

  const restingMonths = finalMonth - month
  const restingDays = (finalDay + (30 * restingMonths)) - day
  const restingHours = 24 - hour
  const restingMinutes = 60 - minute
  const restingSecond = 60 - second
  
  const [seconds, setSeconds] = useState(restingSecond);
  const [minutes, setMinutes] = useState(restingMinutes);
  const [hours, setHours] = useState(restingHours);
  const [days, setDays] = useState(restingDays);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setMinutes(prevMinutes => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              setHours(prevHours => {
                if (prevHours > 0) {
                  return prevHours - 1;
                } else {
                  setDays(prevDays => (prevDays > 0 ? prevDays - 1 : 0));
                  return 23;
                }
              });
              return 59;
            }
          });
          return 59;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { seconds, minutes, hours, days };
};