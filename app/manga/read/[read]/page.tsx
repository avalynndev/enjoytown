import Image from "next/image";

export default async function Read({ params }:any) {
  const chapterId = params.read;
  const results = await getPages(chapterId);
  const image_base_url = results.baseUrl + "/data/" + results.chapter.hash;

  if (results.length === 0) {
    return (
      <div>
        <p>This chapter has no content. Please check the next chapter.</p>
      </div>
    );
  }

  let images = [];
  for (var i = 0; i < results.chapter.data.length; i++) {
    var imgUrl = image_base_url + "/" + results.chapter.data[i];
    images.push(imgUrl);
  }

  return (
    <div>
      <div className="items-center justify-center flex flex-col">
        {images &&
          images.map((item, index) => (
            <div key={index}>
              <Image
                src={`https://sup-proxy.zephex0-f6c.workers.dev/api-content?url=${item}&headers=https://mangadex.org`}
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

async function getPages(id:any) {
  const res = await fetch(`https://api.mangadex.org/at-home/server/${id}`);
  const data = await res.json();
  return data;
}
