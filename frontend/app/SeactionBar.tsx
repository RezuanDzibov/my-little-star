export default function SectionBar({ sectionName }: { sectionName: string }) {
  return (
    <div className="flex items-center w-[95%] h-16 p-4 mb-4 backdrop-blur-md bg-white/15 shadow-md rounded-3xl">
      <h1 className="text-xl">{sectionName}</h1>
    </div>
  );
}
