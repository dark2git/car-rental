"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchVehicleById } from "@/lib/api";
import BookingForm from "@/components/BookingForm/BookingForm";
import { formatMileage } from "@/lib/format";
import Image from "next/image";
import type { Vehicle } from "@/lib/types";
import styles from "./VehicleDetailsPage.module.css";

export default function VehicleDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await fetchVehicleById(id);
        setVehicle(data);
      } catch {
        setError("Vehicle not found.");
      }
    })();
  }, [id]);

  if (error) {
    return (
      <section className="container">
        <p>{error}</p>
      </section>
    );
  }

  if (!vehicle) {
    return (
      <section className="container">
        <p>Loading...</p>
      </section>
    );
  }

  const [, city, country] = vehicle.address
    .split(",")
    .map((part) => part.trim());

  return (
    <section className={`container ${styles.page}`}>
      <div className={styles.topRow}>
        <div className={styles.leftColumn}>
          <div className={styles.imageWrap}>
            <Image
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              width={640}
              height={512}
              className={styles.image}
            />
          </div>

          <BookingForm
            vehicleId={vehicle.id}
            vehicleLabel={`${vehicle.brand} ${vehicle.model}`}
          />
        </div>

        <div className={styles.mainInfo}>
          <div className={styles.summaryBlock}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>
                {vehicle.brand} {vehicle.model}, {vehicle.year}
              </h1>
              <span className={styles.id}>Id: {vehicle.id.slice(-4)}</span>
            </div>

            <div className={styles.locationLine}>
              <p className={styles.locationText}>
                <svg
                  className={styles.metaIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-location" />
                </svg>
                <span>
                  {city}, {country}
                </span>
              </p>
              <p className={styles.mileageText}>
                <span>Mileage: {formatMileage(vehicle.mileage)}</span>
              </p>
            </div>

            <p className={styles.price}>${vehicle.price}</p>

            <p className={styles.description}>{vehicle.description}</p>
          </div>

          <div className={styles.detailsBlock}>
            <h3 className={styles.blockTitle}>Rental Conditions:</h3>
            <ul className={styles.list}>
              {vehicle.rentalConditions.map((condition) => (
                <li key={condition} className={styles.listItem}>
                  <svg
                    className={styles.listIcon}
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#icon-check" />
                  </svg>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.detailsBlock}>
            <h3 className={styles.blockTitle}>Car Specifications:</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <svg
                  className={styles.listIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-calendar" />
                </svg>
                <span>Year: {vehicle.year}</span>
              </li>
              <li className={styles.listItem}>
                <svg
                  className={styles.listIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-car" />
                </svg>
                <span>Type: {vehicle.type}</span>
              </li>
              <li className={styles.listItem}>
                <svg
                  className={styles.listIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-fuel" />
                </svg>
                <span>Fuel Consumption: {vehicle.fuelConsumption}</span>
              </li>
              <li className={styles.listItem}>
                <svg
                  className={styles.listIcon}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#icon-gear" />
                </svg>
                <span>Engine Size: {vehicle.engineSize}</span>
              </li>
            </ul>
          </div>

          <div className={styles.detailsBlock}>
            <h3 className={styles.blockTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={styles.list}>
              {[...vehicle.accessories, ...vehicle.functionalities].map(
                (item) => (
                  <li key={item} className={styles.listItem}>
                    <svg
                      className={styles.listIcon}
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#icon-check" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
