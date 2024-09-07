import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import TimeLeft from "@/components/ui/time-left";
import { useState } from "react";

export default function App() {
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);
  const [expectancyYears, setExpectancyYears] = useState<number | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="bg-white p-8 font-serif flex-grow">
        <header className="max-w-md mx-auto">
          <h1 className="text-4xl mb-2 flex items-center">Memento Mori</h1>
          <p className="text-gray-600 mb-4">
            [mə&apos;mentoʊ &apos;mɔːri] · <span className="italic">Latin</span>
          </p>
          <hr className="border-gray-300 mb-4" />
          <p className="text-md leading-relaxed">
            The Stoics used Memento Mori to invigorate life, and to create
            priority and meaning. They treated each day as a gift, and reminded
            themselves constantly to not waste any time in the day on the
            trivial and vain.
          </p>
        </header>

        <section className="max-w-md mx-auto mt-5 flex flex-col justify-center">
          <DatePicker
            placeholder="Your Birthday"
            date={birthday}
            setDate={setBirthday}
          />
          <Input
            value={expectancyYears}
            onChange={(e) => setExpectancyYears(Number(e.target.value))}
            type="number"
            className="mt-4 text-center"
            placeholder="        Life Expectancy (years)"
            min={0}
            max={120}
          />
          <cite className="mt-4 text-sm md:text-md ">
            "Think of yourself as dead. You have lived your life. Now, take
            what's left and live it properly."
            <span className="text-sm text-gray-600"> - Marcus Aurelius</span>
          </cite>
        </section>
        <section className="mt-2">
          {birthday && expectancyYears && (
            <TimeLeft birthday={birthday} expectancyYears={expectancyYears} />
          )}
        </section>
      </main>

      <footer className="bg-white p-4">
        <p className="text-center text-sm mt-4 text-gray-600">
          Created by{" "}
          <a href="https://github.com/wiredmatt" className="underline">
            wiredmatt
          </a>
        </p>
      </footer>
    </div>
  );
}
