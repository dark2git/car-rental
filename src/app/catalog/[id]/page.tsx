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
        <div className={styles.imageWrap}>
          <Image
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            width={640}
            height={512}
            className={styles.image}
          />
        </div>

        <div className={styles.mainInfo}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {vehicle.brand} {vehicle.model}, {vehicle.year}
            </h1>
            <span className={styles.id}>Id: {vehicle.id.slice(-4)}</span>
          </div>

          <div className={styles.locationLine}>
            <p className={styles.locationText}>
              {city}, {country}
            </p>
            <p className={styles.mileageText}>
              Mileage: {formatMileage(vehicle.mileage)}
            </p>
          </div>

          <p className={styles.price}>${vehicle.price}</p>

          <p className={styles.description}>{vehicle.description}</p>

          <h3 className={styles.blockTitle}>Rental Conditions:</h3>
          <ul className={styles.list}>
            {vehicle.rentalConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>

          <h3 className={styles.blockTitle}>Car Specifications:</h3>
          <ul className={styles.list}>
            <li>Year: {vehicle.year}</li>
            <li>Type: {vehicle.type}</li>
            <li>Fuel Consumption: {vehicle.fuelConsumption}</li>
            <li>Engine Size: {vehicle.engineSize}</li>
          </ul>

          <h3 className={styles.blockTitle}>
            Accessories and functionalities:
          </h3>
          <ul className={styles.list}>
            {[...vehicle.accessories, ...vehicle.functionalities].map(
              (item) => (
                <li key={item}>{item}</li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <BookingForm
          vehicleId={vehicle.id}
          vehicleLabel={`${vehicle.brand} ${vehicle.model}`}
        />
        <div />
      </div>
    </section>
  );
}
