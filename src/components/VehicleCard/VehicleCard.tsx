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
          className={styles.favoriteBtn}
          onClick={() => toggleFavorite(vehicle.id)}
          aria-label="Toggle favorite"
        >
          <svg
            className={styles.favoriteIcon}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <use
              href={`/icons.svg#${isFavorite ? "icon-heartActive" : "icon-heartDefault"}`}
            />
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
