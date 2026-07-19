"use client";

import { useEffect, useRef } from "react";
import styles from "@/components/contact-showcase.module.css";

const MONTES_CLAROS_CENTER: [number, number] = [-16.7278, -43.8425];
const MONTES_CLAROS_BOUNDS: [[number, number], [number, number]] = [
  [-16.812, -43.965],
  [-16.645, -43.748],
];

type Road = {
  t: string;
  p: [number, number][];
};

type RoadMapData = {
  roads: Road[];
};

function getRoadStyle(type: string): import("leaflet").PolylineOptions {
  const majorRoads = new Set(["motorway", "trunk", "primary", "secondary"]);
  const connectorRoads = new Set(["tertiary", "unclassified"]);

  if (majorRoads.has(type)) {
    return {
      color: "#ffffff",
      opacity: 0.82,
      weight: 1.35,
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
    };
  }

  if (connectorRoads.has(type)) {
    return {
      color: "#ffffff",
      opacity: 0.52,
      weight: 0.72,
      lineCap: "round",
      lineJoin: "round",
      interactive: false,
    };
  }

  return {
    color: "#ffffff",
    opacity: 0.28,
    weight: 0.42,
    lineCap: "round",
    lineJoin: "round",
    interactive: false,
  };
}

export function MontesClarosMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;

    async function initializeMap() {
      const container = containerRef.current;

      if (!container || mapRef.current || disposed) return;

      const L = await import("leaflet");

      if (disposed || !containerRef.current) return;

      const map = L.map(container, {
        center: MONTES_CLAROS_CENTER,
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        dragging: false,
        touchZoom: false,
        preferCanvas: true,
        zoomAnimation: false,
        fadeAnimation: false,
        markerZoomAnimation: false,
      });

      mapRef.current = map;
      map.setMaxBounds(L.latLngBounds(MONTES_CLAROS_BOUNDS).pad(0.18));

      const response = await fetch("/data/montes-claros-roads.json", {
        signal: controller.signal,
      });

      if (!response.ok) return;

      const roadMap = (await response.json()) as RoadMapData;

      if (disposed || !mapRef.current) return;

      const renderer = L.canvas({ padding: 0.45 });

      roadMap.roads.forEach((road) => {
        L.polyline(road.p, {
          ...getRoadStyle(road.t),
          renderer,
        }).addTo(map);
      });

      resizeObserver = new ResizeObserver(() => map.invalidateSize(false));
      resizeObserver.observe(container);
      window.requestAnimationFrame(() => map.invalidateSize(false));
    }

    void initializeMap().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error("Could not initialize the Montes Claros map.", error);
    });

    return () => {
      disposed = true;
      controller.abort();
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={styles.mapLayer} aria-hidden="true">
      <div ref={containerRef} className={styles.mapViewport} />
      <div className={styles.mapMarker} />
    </div>
  );
}
