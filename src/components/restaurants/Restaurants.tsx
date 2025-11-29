"use client";

// import { BusinessCard as BusinessCardType } from "app/api/user-profile/favourite/get/route";
import { useState, useEffect } from "react";
// import { PAGE_LIMIT_24 } from "utility/constants";
// import { FilterProps } from "components/filters/desktop";
// import { FilterState } from "utility/types/filter-service";
// import { useFilterService } from "utility/hooks/useFilteredData";
// import { useMobileImport } from "utility/hooks/useMobileImport";
import type { RestaurantCardType } from "@/utility/types";
import RestaurantCard from "./restaurant-card/RestaurantCards";
import { HeaderSection } from "../HeaderSection/HeaderSepartor";
import { supabase } from "@/supabase/supabase";
// const BusinessCard = dynamic(() => import("components/business-card"));

// const PaginationComponent = dynamic(() => import("components/pagination"));

// const DesktopFilters = dynamic(() => import("components/filters/desktop"));

// type SpecialistsProps = {
//   restaurants: RestaurantCardType[];
//   countOfPages: number;
// };

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantCardType[]>([]);
  console.log(restaurants);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from("restaurants")
          .select(`*, location: locations (name)`);
        if (error) {
          console.error("Error fetching restaurants from db:", error);
          return;
        }
        console.log(data, "sb data");

        setRestaurants(data);
      } catch (err) {
        console.error("Server errorfetching restaurants:", err);
        setRestaurants([]);
      }
    };

    fetchRestaurants();
  }, []);

  //   const [pages, setPages] = useState<number>(countOfPages);
  //   const [currentPage, setCurrentPage] = useState<number>(1);
  //   const [currentFilters, setCurrentFilters] = useState<FilterState>({});

  //   const { fetchFilteredData, hasActiveFilters, getCachedData } =
  //     useFilterService<RestaurantCardType>({
  //       apiEndpoints: {
  //         list: "/specialists",
  //         count: "/business/count",
  //       },
  //       buildQueryParams: (filters, page) => {
  //         const params = new URLSearchParams();
  //         params.set("page", String(page));

  //         if (filters.categoryId && filters.categoryId !== 0) {
  //           params.set("catId", String(filters.categoryId));
  //         }
  //         if (filters.location) {
  //           params.set("locId", String(filters.location));
  //         }
  //         if (filters.rating != null) {
  //           params.set("raiting", String(Math.round(filters.rating)));
  //         }

  //         return `?${params.toString()}`;
  //       },
  //       enableCache: true,
  //     });

  //   const applyFilters = useCallback(
  //     async (
  //       categoryId?: number,
  //       location?: number | string,
  //       rating?: number | null,
  //     ) => {
  //       const newFilters: FilterState = { categoryId, location, rating };
  //       setCurrentFilters(newFilters);
  //       setCurrentPage(1);

  //       if (!hasActiveFilters(newFilters)) {
  //         setBusinesses(restaurants);
  //         setPages(countOfPages);
  //         setCurrentPage(1);
  //         return;
  //       }

  //       try {
  //         const { data, count } = await fetchFilteredData(newFilters, 1);
  //         setBusinesses(data);
  //         setPages(Math.ceil(count / PAGE_LIMIT_24));
  //         setCurrentPage(1);
  //       } catch (error) {
  //         console.error("Error fetching filtered data:", error);
  //       }
  //     },
  //     [restaurants, countOfPages, hasActiveFilters, fetchFilteredData],
  //   );

  //   const changePage = useCallback(
  //     async (newPage: number) => {
  //       if (newPage === currentPage) return;

  //       const cachedData = getCachedData(currentFilters, newPage);

  //       if (cachedData) {
  //         setBusinesses(cachedData);
  //         setCurrentPage(newPage);
  //         return;
  //       }

  //       try {
  //         const { data } = await fetchFilteredData(currentFilters, newPage);
  //         setBusinesses(data);
  //         setCurrentPage(newPage);
  //       } catch (error) {
  //         console.error("Error fetching page data:", error);
  //       }
  //     },
  //     [currentPage, currentFilters, getCachedData, fetchFilteredData],
  //   );

  //   const { isMobile, LazyComponent: LazyFilterDropdown } =
  //     useMobileImport<FilterProps>(() => import("components/filters/mobile"));

  return (
    <main className="full-width-section bg-base-100 lg:pb-24 pb-12">
      <div className="flex flex-col content-container lg:gap-12 lg:pt-12">
        <HeaderSection
          header="Ресторанти"
          subHeader="Регистриралите се ресторанти в нашата платформа"
        />
        {/* {!isMobile && (
        <div className="hidden lg:flex lg:flex-row flex-[3] h-max border-neutral border-1 rounded-2xl">
          <DesktopFilters hasCategories={true} applyFilter={applyFilters} />
        </div>
      )} */}
        {/* <div className="flex-[7]">
        {isMobile && LazyFilterDropdown && (
          <div className="flex justify-between items-center pb-6">
            <LazyFilterDropdown hasCategories applyFilter={applyFilters} />
          </div>
        )} */}
        {restaurants.length ? (
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 lg:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center">
            В момента няма ресторанти, които може да Ви покажем, на база
            избраните от Вас филтри!
          </p>
        )}
        {/* 
        <PaginationComponent
          pages={pages}
          currentPage={currentPage}
          changePage={(newPage) => changePage(newPage)}
        /> */}
        {/* </div> */}
      </div>
    </main>
  );
};

export default Restaurants;
