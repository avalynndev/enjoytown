import React, { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import SaveToLocalStorage from "@/components/localstorage";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  episode_group: z
    .string({
      required_error: "Please select an Episode Group.",
    })
    .email(),
});


const EpisodeContainer = ({ data }: any) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const episodes = data.episodes;

  const handleGroupChange = (value: number) => {
    setSelectedGroup(value);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data.episode_group);
  }

  const renderEpisodeButtons = () => {
    const startIndex = selectedGroup * 100;
    const endIndex = Math.min(startIndex + 100, episodes.length);

    const episodeButtons = [];
    for (let i = startIndex; i < endIndex; i++) {
      const episode = episodes[i];
      episodeButtons.push(
        <Link
          shallow
          key={`episode-${data.id}-${episode.number}`}
          href={`/anime/watch/${data.id}/${episode.number}`}
        >
          <Button
            key={episode.id}
            onClick={() =>
              save_to_local(
                data.id,
                data.title,
                episode.number,
                data.image,
                "anime"
              )
            }
          >
            {episode.number}
          </Button>
        </Link>
      );
    }
    return episodeButtons;
  };

  const renderGroupDropdown = () => {
    if (episodes.length > 100) {
      const totalGroups = Math.ceil(episodes.length / 100);
      const options = Array.from({ length: totalGroups }, (_, index) => ({
        value: index,
        label: `${index * 100 + 1}-${Math.min(
          (index + 1) * 100,
          episodes.length
        )}`,
      }));

      return (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="episode_group"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    size="sm"
                    color="primary"
                    variant="underlined"
                    startContent={<Icons.paw />}
                    placeholder="Select an episode group"
                    className="max-w-xs text-foreground bg-background"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an episode group" />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-foreground bg-background"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">
              <Icons.check/>
              </Button>
          </form>
        </Form>
      );
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto ">
        <div className="">
          {renderGroupDropdown()}
          <div className="flex flex-wrap gap-2 items-center pt-6">
            {renderEpisodeButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

const save_to_local = (
  id: string,
  title: string,
  episode: number,
  image: URL,
  type: string
): void => {
  const data: any = {
    id: id,
    title: title,
    image: image,
    episode_number: episode,
    type: type,
  };

  SaveToLocalStorage(data);
};

export default EpisodeContainer;
