"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VideoPlayer({ id }:any) {
  return (
    <div className="pb-8">
      <Tabs defaultValue="vidsrc">
        <div className="flex flex-col items-center">
          <TabsList>
            <TabsTrigger value="vidsrc">VidSrc</TabsTrigger>
            <TabsTrigger value="vidsrcpro">Vid.Pro</TabsTrigger>
            <TabsTrigger value="vidsrcin">Vid.In</TabsTrigger>
            <TabsTrigger value="blackvid">BlackVid</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="vidsrc">
          <iframe
            src={`https://vidsrc.icu/embed/movie/${id}`}
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
            src={`https://vidsrc.pro/embed/movie/${id}`}
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
            src={`https://vidsrc.in/embed/movie/${id}`}
            referrerPolicy="origin"
            allowFullScreen
            width="100%"
            height="450"
            scrolling="no"
            className="max-w-3xl mx-auto px-4 pt-10"
          ></iframe>
        </TabsContent>
        <TabsContent value="blackvid">
          <iframe
            src={`https://blackvid.space/embed/movie/${id}`}
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
