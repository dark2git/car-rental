"use client";

import Image from "next/image";
import Link from "next/link";
import { formatMileage } from "@/lib/format";
import type { Vehicle } from "@/lib/types";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import styles from "./VehicleCard.module.css";

type Props = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: Props) {
  const toggleFavorite = useVehiclesStore((state) => state.toggleFavorite);
  const favorites = useVehiclesStore((state) => state.favorites);
  const isFavorite = favorites.includes(vehicle.id);
  const [, city, country] = vehicle.address
    .split(",")
    .map((part) => part.trim());

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          width={274}
          height={268}
          className={styles.image}
        />
        <button
          type="button"
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ""}`}
          onClick={() => toggleFavorite(vehicle.id)}
          aria-label="Toggle favorite"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M12 21s-7.5-4.5-9.5-9A5.5 5.5 0 0 1 12 5a5.5 5.5 0 0 1 9.5 7c-2 4.5-9.5 9-9.5 9Z" />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {vehicle.brand} <span>{vehicle.model}</span>, {vehicle.year}
          </h3>
          <p className={styles.price}>${vehicle.price}</p>
        </div>

        <p className={styles.meta}>
          {city} | {country} | {vehicle.rentalCompany}
        </p>
        <p className={styles.meta}>
          {vehicle.type} | {formatMileage(vehicle.mileage)}
        </p>

        <Link href={`/catalog/${vehicle.id}`} className={styles.link}>
          Read more
        </Link>
      </div>
    </article>
  );
}
