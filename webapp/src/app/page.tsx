import { Button } from "@heroui/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
      <div className='flex items-center h-[calc(100vh_-_160px)] justify-center'>
          <div className='flex flex-col justeify-center items-center gap-5 text-5xl font-bold text-center text-purple-800'>
              <AcademicCapIcon className='h-96 w-96' />
              <div>Welcome to Overflow</div>
          </div>
      </div>
  );
}
