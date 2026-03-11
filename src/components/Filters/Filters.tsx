"use client";

import { useEffect, useRef, useState } from "react";
import { fetchBrands } from "@/lib/api";
import type { VehicleFilters } from "@/lib/types";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import styles from "./Filters.module.css";

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80];

export default function Filters() {
  const setFilters = useVehiclesStore((state) => state.setFilters);

  const [formValues, setFormValues] = useState<VehicleFilters>({});
  const [brands, setBrands] = useState<string[]>([]);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const brandRef = useRef<HTMLDivElement | null>(null);
  const priceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch {
        setBrands([]);
      }
    })();
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (brandRef.current && !brandRef.current.contains(target)) {
        setIsBrandOpen(false);
      }

      if (priceRef.current && !priceRef.current.contains(target)) {
        setIsPriceOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await setFilters(formValues);
  };

  const setNumber = (key: keyof VehicleFilters, value: string) => {
    setFormValues((prev) => {
      if (!value) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }

      return { ...prev, [key]: Number(value) };
    });
  };

  const setText = (key: keyof VehicleFilters, value: string) => {
    setFormValues((prev) => {
      if (!value) {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }

      return { ...prev, [key]: value };
    });
  };

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <div className={`${styles.field} ${styles.brandField}`} ref={brandRef}>
        <span className={styles.label}>Car brand</span>
        <button
          type="button"
          className={styles.selectBtn}
          onClick={() => {
            setIsBrandOpen((prev) => !prev);
            setIsPriceOpen(false);
          }}
        >
          <span>{formValues.brand ?? "Choose a brand"}</span>
          <span
            className={`${styles.chevron} ${isBrandOpen ? styles.chevronUp : ""}`}
          >
            ▾
          </span>
        </button>

        {isBrandOpen && (
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.optionBtn}
              onClick={() => {
                setText("brand", "");
                setIsBrandOpen(false);
              }}
            >
              All brands
            </button>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand}
                className={`${styles.optionBtn} ${formValues.brand === brand ? styles.optionActive : ""}`}
                onClick={() => {
                  setText("brand", brand);
                  setIsBrandOpen(false);
                }}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`${styles.field} ${styles.priceField}`} ref={priceRef}>
        <span className={styles.label}>Price / 1 hour</span>
        <button
          type="button"
          className={styles.selectBtn}
          onClick={() => {
            setIsPriceOpen((prev) => !prev);
            setIsBrandOpen(false);
          }}
        >
          <span>
            {formValues.price ? `To $${formValues.price}` : "Choose a price"}
          </span>
          <span
            className={`${styles.chevron} ${isPriceOpen ? styles.chevronUp : ""}`}
          >
            ▾
          </span>
        </button>

        {isPriceOpen && (
          <div className={styles.dropdown}>
            <button
              type="button"
              className={styles.optionBtn}
              onClick={() => {
                setNumber("price", "");
                setIsPriceOpen(false);
              }}
            >
              Any
            </button>
            {PRICE_OPTIONS.map((price) => (
              <button
                type="button"
                key={price}
                className={`${styles.optionBtn} ${formValues.price === price ? styles.optionActive : ""}`}
                onClick={() => {
                  setNumber("price", String(price));
                  setIsPriceOpen(false);
                }}
              >
                {price}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`${styles.field} ${styles.mileageField}`}>
        <span className={styles.label}>Car mileage / km</span>
        <div className={styles.mileageBox}>
          <input
            className={styles.input}
            type="number"
            min={0}
            placeholder="From"
            value={formValues.mileageFrom ?? ""}
            onChange={(e) => setNumber("mileageFrom", e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            min={0}
            placeholder="To"
            value={formValues.mileageTo ?? ""}
            onChange={(e) => setNumber("mileageTo", e.target.value)}
          />
        </div>
      </div>

      <button className={styles.searchBtn} type="submit">
        Search
      </button>
    </form>
  );
}
