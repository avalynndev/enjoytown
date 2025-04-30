'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { fetchChapter } from '@/lib/consumet';
import { useParams } from 'next/navigation';

export default function Read() {
  const params = useParams();
  const { id, title, lang, chapter } = params as Record<string, string>;

  const [images, setImages] = useState<string[]>([]);
  const fetchData = useCallback(async () => {
    try {
      const fetchedResults = await fetchChapter(`${title}/${lang}/${chapter}`);
      setImages(fetchedResults.map((page: any) => page.img));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [chapter, lang, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <div className="flex flex-1 flex-col items-center justify-center">
        {images.map((item, index) => (
          <div key={index}>
            <Image
              src={`https://api.1anime.app/image-proxy?url=${item}`}
              key={index}
              alt="Pages"
              width={800}
              height={1000}
              priority
              quality={100}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
