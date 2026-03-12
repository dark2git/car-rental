"use client";

import { useEffect } from "react";
import Filters from "@/components/Filters/Filters";
import VehicleCard from "@/components/VehicleCard/VehicleCard";
import { useVehiclesStore } from "@/store/useVehiclesStore";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { vehicles, loadVehicles, resetResults, hasMore, isLoading, error } =
    useVehiclesStore();

  useEffect(() => {
    resetResults();
    loadVehicles(false);
  }, [loadVehicles, resetResults]);

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.filter_wrapper}>
          <Filters />
        </div>

        <div className={styles.grid}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {!isLoading && vehicles.length === 0 && (
          <p className={styles.empty}>No vehicles found.</p>
        )}
        {error && <p className={styles.error}>{error}</p>}

        {hasMore && !isLoading && (
          <div className={styles.loadMoreWrap}>
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => loadVehicles(true)}
            >
              Load more
            </button>
          </div>
        )}

        {isLoading && <p className={styles.loading}>Loading...</p>}
      </div>
    </section>
  );
}
