export default function List() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Introduction
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Learn on how you can use this to the full potential
            </p>
          </div>
          <div className="prose prose-lg prose-neutral mx-auto">
            <p>Still in Development</p>
            <a href="/list/anime">- Check Anime</a>(Completed)
          </div>
        </div>
      </div>
    </div>
  );
}
