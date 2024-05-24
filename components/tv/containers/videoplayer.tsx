"use client";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@nextui-org/react";

export default function VideoPlayer({ id }: any) {
  const [episode, setEpisode] = React.useState("1");
  const [season, setSeason] = React.useState("1");
  return (
    <div className="pb-8">
      <div className="pb-4">
        <div className="flex flex-col text-center items-center justify-center">
          <div className="border-2 rounded-md	pl-4 flex w-full max-w-sm items-center space-x-2">
            Season:{" "}
            <Input
              placeholder="Season"
              value={season}
              onValueChange={setSeason}
            />{" "}
            Episode:{" "}
            <Input
              placeholder="Episode"
              value={episode}
              onValueChange={setEpisode}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 max-w-[240px]"></div>
      <Tabs defaultValue="vidsrc">
        <div className="flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="vidsrc">VidSrc</TabsTrigger>
            <TabsTrigger value="vidsrcpro">Vid.Pro</TabsTrigger>
            <TabsTrigger value="vidsrcin">Vid.In</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="vidsrc">
          <iframe
            src={`https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>

        <TabsContent value="vidsrcpro">
          <iframe
            src={`https://vidsrc.pro/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="vidsrcin">
          <iframe
            src={`https://vidsrc.in/embed/tv/${id}/${season}/${episode}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
      </Tabs>
    </div>
  );
}
