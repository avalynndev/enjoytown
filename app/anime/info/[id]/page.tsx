"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import DetailsContainer from "@/components/anime/container/details";
import EpisodeContainer from "@/components/anime/container/episode";

import { url } from "@/config/url";

const Info = ({ params }: any) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();

  const fetchDetails = useCallback(async () => {
    try {
      const response = await axios.get(url.info + id);
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
          {!data ? (
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="text-4xl font-bold mb-4">No Results Found</div>
              <div className="text-gray-500">Took a wrong turn?</div>
            </div>
          ) : (
            <div>
              <DetailsContainer key={`details-${data?.id}`} data={data} />
              <EpisodeContainer key={`episodes-${data?.id}`} data={data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Info;
