"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import DetailsContainer from "@/components/containers/anime/details";

import { url } from "@/config/url";

const Info = ({ params }: any) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [watch_data, setWatchData] = useState<any>();

  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://consumet-jade.vercel.app/meta/anilist/info" +
          id +
          "?provider=gogoanime"
      );
      setWatchData(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id, fetchDetails]);

  return (
    <div className="pb-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="py-8 px-4 sm:px-6 lg:px-8"></div>
        </div>
      ) : (
        <div>
            <div>
              <DetailsContainer
                key={`details-${data?.id}`}
                data={data}
                watch_data={watch_data}
              />
            </div>
        </div>
      )}
    </div>
  );
};

export default Info;
