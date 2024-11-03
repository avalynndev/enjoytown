import React, { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/common/icons';
import SaveToLocalStorage from '@/lib/localstorage';

import { Button } from '@/components/ui/button';
import { SelectItem, Select } from '@nextui-org/react';

const EpisodeContainer = ({ data }: any) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const episodes = data.episodes;

  const handleGroupChange = (value: number) => {
    setSelectedGroup(value);
  };

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
          href={`/anime/watch/${data.id}/${episode.number.toString().replace(/\./g, '-')}`}
        >
          <Button
            key={episode.id}
            onClick={() => save_to_local(data.id, data.title, episode.number, data.image, 'anime')}
          >
            {episode.number}
          </Button>
        </Link>,
      );
    }
    return episodeButtons;
  };

  const renderGroupDropdown = () => {
    if (episodes.length > 100) {
      const totalGroups = Math.ceil(episodes.length / 100);
      const options = Array.from({ length: totalGroups }, (_, index) => ({
        value: index,
        label: `${index * 100 + 1}-${Math.min((index + 1) * 100, episodes.length)}`,
      }));

      return (
        <Select
          size="sm"
          placeholder="Select a Episode Group"
          className="max-w-xs rounded-md"
          disableSelectorIconRotation
          defaultSelectedKeys={['0']}
          selectorIcon={<Icons.blank className="h-0 w-0" />}
          endContent={<Icons.paw />}
          renderValue={(items) => {
            return items.map((item) => (
              <div key={item.key} className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span>{item.textValue}</span>
                </div>
              </div>
            ));
          }}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="bg-background text-foreground"
              onClick={() => handleGroupChange(option.value)}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="">
          {renderGroupDropdown()}
          <div className="flex flex-wrap items-center gap-2 pt-6">{renderEpisodeButtons()}</div>
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
  type: string,
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
