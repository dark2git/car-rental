"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { submitBooking } from "@/lib/api";
import styles from "./BookingForm.module.css";

type Props = {
  vehicleId: string;
  vehicleLabel: string;
};

type CalendarCell = {
  value: Date;
  inCurrentMonth: boolean;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function toIsoDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDisplayDate(value: string) {
  if (!value) {
    return "Booking date";
  }

  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

export default function BookingForm({ vehicleId, vehicleLabel }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const previousMonthDays = new Date(year, month, 0).getDate();

    const cells: CalendarCell[] = [];

    for (let i = firstWeekday - 1; i >= 0; i -= 1) {
      cells.push({
        value: new Date(year, month - 1, previousMonthDays - i),
        inCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        value: new Date(year, month, day),
        inCurrentMonth: true,
      });
    }

    while (cells.length % 7 !== 0) {
      const nextDay = cells.length - (firstWeekday + daysInMonth) + 1;
      cells.push({
        value: new Date(year, month + 1, nextDay),
        inCurrentMonth: false,
      });
    }

    return cells;
  }, [calendarMonth]);

  const monthLabel = useMemo(
    () =>
      calendarMonth.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [calendarMonth],
  );

  const selectedDateIso = date;
  const todayIso = toIsoDate(new Date());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date) {
      toast.error("Please choose booking date");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitBooking({
        vehicleId,
        name,
        email,
        date,
        comment,
      });

      toast.success(`Booking created for ${vehicleLabel}`);

      setName("");
      setEmail("");
      setDate("");
      setComment("");
    } catch {
      toast.error("Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectDate = (value: Date) => {
    setDate(toIsoDate(value));
    setCalendarMonth(new Date(value.getFullYear(), value.getMonth(), 1));
    setIsDatePickerOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <Toaster position="top-right" />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.titleBlock}>
          <h2>Book your car now</h2>
          <p className={styles.subtitle}>
            Stay connected! We are always ready to help you.
          </p>
        </div>

        <div className={styles.inputGroup}>
          <input
            required
            type="text"
            placeholder="Name*"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            required
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className={styles.datePicker} ref={datePickerRef}>
            <button
              className={styles.dateTrigger}
              type="button"
              onClick={() => setIsDatePickerOpen((prev) => !prev)}
              aria-haspopup="dialog"
              aria-expanded={isDatePickerOpen}
              aria-label="Select booking date"
            >
              <span className={styles.dateValue}>
                <span className={!date ? styles.placeholder : undefined}>
                  {toDisplayDate(date)}
                </span>
              </span>
            </button>

            {isDatePickerOpen ? (
              <div
                className={styles.calendarPopover}
                role="dialog"
                aria-label="Date picker"
              >
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.monthButton}
                    onClick={() =>
                      setCalendarMonth(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
                      )
                    }
                    aria-label="Previous month"
                  >
                    <svg
                      className={styles.monthIconPrev}
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#icon-arrowDown" />
                    </svg>
                  </button>

                  <strong>{monthLabel}</strong>

                  <button
                    type="button"
                    className={styles.monthButton}
                    onClick={() =>
                      setCalendarMonth(
                        (prev) =>
                          new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
                      )
                    }
                    aria-label="Next month"
                  >
                    <svg
                      className={styles.monthIconNext}
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#icon-arrowDown" />
                    </svg>
                  </button>
                </div>

                <div className={styles.weekdays}>
                  {WEEKDAYS.map((weekday) => (
                    <span key={weekday}>{weekday}</span>
                  ))}
                </div>

                <div className={styles.calendarGrid}>
                  {calendarCells.map((cell) => {
                    const iso = toIsoDate(cell.value);
                    const isSelected = iso === selectedDateIso;
                    const isPast = iso < todayIso;

                    return (
                      <button
                        key={iso}
                        type="button"
                        className={[
                          styles.day,
                          !cell.inCurrentMonth ? styles.dayOutside : "",
                          isSelected ? styles.daySelected : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        disabled={isPast}
                        onClick={() => handleSelectDate(cell.value)}
                      >
                        {cell.value.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.submitButton}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
