"use client";

import { useEffect, useRef, useState } from "react";
import { fetchBrands } from "@/lib/api";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import styles from "./Filters.module.css";

const PRICE_OPTIONS = [30, 40, 50, 60, 70, 80];

export default function Filters() {
  const filters = useVehiclesStore((state) => state.filters);
  const setFilterValue = useVehiclesStore((state) => state.setFilterValue);
  const applyFilters = useVehiclesStore((state) => state.applyFilters);
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
    await applyFilters();
  };

  const setNumber = (
    key: "price" | "mileageFrom" | "mileageTo",
    value: string,
  ) => {
    setFilterValue(key, value ? Number(value) : undefined);
  };

  const setText = (key: "brand", value: string) => {
    setFilterValue(key, value || undefined);
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
          <span>{filters.brand ?? "Choose a brand"}</span>
          <svg
            className={styles.chevron}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <use
              href={`/icons.svg#${isBrandOpen ? "icon-arrowUp" : "icon-arrowDown"}`}
            />
          </svg>
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
                className={`${styles.optionBtn} ${filters.brand === brand ? styles.optionActive : ""}`}
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
            {filters.price ? `To $${filters.price}` : "Choose a price"}
          </span>
          <svg
            className={styles.chevron}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <use
              href={`/icons.svg#${isPriceOpen ? "icon-arrowUp" : "icon-arrowDown"}`}
            />
          </svg>
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
                className={`${styles.optionBtn} ${filters.price === price ? styles.optionActive : ""}`}
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
            value={filters.mileageFrom ?? ""}
            onChange={(e) => setNumber("mileageFrom", e.target.value)}
          />
          <input
            className={styles.input}
            type="number"
            min={0}
            placeholder="To"
            value={filters.mileageTo ?? ""}
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
