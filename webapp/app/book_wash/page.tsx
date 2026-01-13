"use client";

import { useMemo, useState } from "react";

type Service = {
  id: string;
  title: string;
  desc: string;
  duration: string;
  price: number;
};

const SERVICES: Service[] = [
  {
    id: "basic-wash",
    title: "Basic Wash",
    desc: "Exterior wash, hand dry, tire shine",
    duration: "20–30 min",
    price: 15,
  },
  {
    id: "premium-wash",
    title: "Premium Wash",
    desc: "Exterior, wax, vacuum, tire shine",
    duration: "40–60 min",
    price: 25,
  },
  {
    id: "full-detailing",
    title: "Full Detailing",
    desc: "Complete interior/exterior detail",
    duration: "2–4 hours",
    price: 90,
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    desc: "Premium protection coating",
    duration: "4–8 hours",
    price: 250,
  },
];

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM"];

function formatMoney(n: number) {
  return `${n}€`;
}

function StepDot({
  index,
  label,
  state,
}: {
  index: number;
  label: string;
  state: "done" | "active" | "todo";
}) {
  const isDone = state === "done";
  const isActive = state === "active";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
          isDone ? "bg-lime-500 text-white" : "",
          isActive ? "bg-red-500 text-white" : "",
          state === "todo" ? "bg-gray-300 text-gray-700" : "",
        ].join(" ")}
      >
        {isDone ? "✓" : index}
      </div>
      <div className="text-xs font-semibold text-gray-700">{label}</div>
    </div>
  );
}

function StepLine({ active }: { active: boolean }) {
  return <div className={`h-[3px] w-28 rounded-full ${active ? "bg-lime-500" : "bg-gray-300"}`} />;
}

export default function BookWashPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [serviceId, setServiceId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");
  const [plate, setPlate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [confirmed, setConfirmed] = useState(false);

  const service = useMemo(
    () => SERVICES.find((s) => s.id === serviceId) || null,
    [serviceId]
  );

  const canNext = useMemo(() => {
    if (step === 1) return !!serviceId;
    if (step === 2) return !!date && !!time;
    if (step === 3) return !!carMake.trim() && !!carModel.trim() && !!plate.trim();
    return true;
  }, [step, serviceId, date, time, carMake, carModel, plate]);

  const total = service?.price ?? 0;

  const next = () => {
    if (!canNext) return;
    setStep((prev) => (prev === 4 ? 4 : ((prev + 1) as any)));
  };

  const back = () => {
    setConfirmed(false);
    setStep((prev) => (prev === 1 ? 1 : ((prev - 1) as any)));
  };

  const resetAll = () => {
    setStep(1);
    setServiceId("");
    setDate("");
    setTime("");
    setCarMake("");
    setCarModel("");
    setPlate("");
    setNotes("");
    setConfirmed(false);
  };

  const stepState = (n: 1 | 2 | 3 | 4): "done" | "active" | "todo" => {
    if (step > n) return "done";
    if (step === n) return "active";
    return "todo";
  };

  return (
    <main className="bg-rose-50">
      <section className="mx-auto max-w-6xl px-4 py-14">
        {/* Header */}
        <div className="text-center">


          <h1 className="mt-6 text-5xl font-extrabold text-black">
            <span className="text-red-500">Booking System</span>
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Experience the complete booking flow. Takes less than 2 minutes!
          </p>

          {/* Steps */}
          <div className="mt-10 flex items-center justify-center gap-6">
            <StepDot index={1} label="Service" state={stepState(1)} />
            <StepLine active={step > 1} />
            <StepDot index={2} label="Date & Time" state={stepState(2)} />
            <StepLine active={step > 2} />
            <StepDot index={3} label="Vehicle Info" state={stepState(3)} />
            <StepLine active={step > 3} />
            <StepDot index={4} label="Confirm" state={stepState(4)} />
          </div>
        </div>

        {/* Card */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-10 shadow-xl">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-extrabold text-black">Select Your Service</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {SERVICES.map((s) => {
                  const selected = s.id === serviceId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServiceId(s.id)}
                      className={[
                        "rounded-xl border p-6 text-left transition",
                        selected ? "border-red-500 ring-2 ring-red-200" : "border-gray-200 hover:border-gray-300",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-lg font-extrabold text-black">{s.title}</div>
                          <div className="mt-2 text-sm text-gray-600">{s.desc}</div>
                        </div>
                        <div className="text-xl font-extrabold text-red-500">{formatMoney(s.price)}</div>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs">
                          ⏱
                        </span>
                        {s.duration}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={next}
                  disabled={!canNext}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white",
                    canNext ? "bg-rose-400 hover:bg-rose-500" : "bg-rose-200 cursor-not-allowed",
                  ].join(" ")}
                >
                  Next Step <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-extrabold text-black">Choose Date & Time</h2>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <label className="text-sm font-bold text-black">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-black">Select Time Slot</label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={[
                            "rounded-lg border px-4 py-3 text-sm font-semibold transition",
                            selected
                              ? "border-red-500 bg-red-50 text-red-600"
                              : "border-gray-200 hover:border-gray-300 text-gray-800",
                          ].join(" ")}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-6 py-3 text-sm font-bold text-white hover:bg-gray-700"
                >
                  ← Back
                </button>

                <button
                  onClick={next}
                  disabled={!canNext}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white",
                    canNext ? "bg-rose-400 hover:bg-rose-500" : "bg-rose-200 cursor-not-allowed",
                  ].join(" ")}
                >
                  Next Step <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-extrabold text-black">Vehicle Information</h2>

              <div className="mt-8 grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-bold text-black">Car Make</label>
                    <input
                      value={carMake}
                      onChange={(e) => setCarMake(e.target.value)}
                      placeholder="e.g., Toyota"
                      className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-black">Car Model</label>
                    <input
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="e.g., Camry"
                      className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-black">License Plate Number</label>
                  <input
                    value={plate}
                    onChange={(e) => setPlate(e.target.value)}
                    placeholder="e.g., ABC-1234"
                    className="mt-3 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-black">Additional Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or concerns?"
                    className="mt-3 min-h-[120px] w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-red-300"
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-6 py-3 text-sm font-bold text-white hover:bg-gray-700"
                >
                  ← Back
                </button>

                <button
                  onClick={next}
                  disabled={!canNext}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white",
                    canNext ? "bg-rose-400 hover:bg-rose-500" : "bg-rose-200 cursor-not-allowed",
                  ].join(" ")}
                >
                  Next Step <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-extrabold text-black">Confirm Your Booking</h2>

              <div className="mt-8 rounded-xl bg-rose-100/70 p-6">
                <div className="grid gap-4 text-sm">
                  <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                    <span className="font-bold text-black">Service:</span>
                    <span className="text-gray-700">{service?.title ?? "-"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                    <span className="font-bold text-black">Date:</span>
                    <span className="text-gray-700">{date || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                    <span className="font-bold text-black">Time:</span>
                    <span className="text-gray-700">{time || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                    <span className="font-bold text-black">Vehicle:</span>
                    <span className="text-gray-700">
                      {carMake && carModel ? `${carMake} ${carModel}` : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-rose-200 pb-3">
                    <span className="font-bold text-black">Plate:</span>
                    <span className="text-gray-700">{plate || "-"}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-extrabold text-black">Total Price:</span>
                    <span className="text-2xl font-extrabold text-red-500">{formatMoney(total)}</span>
                  </div>
                </div>
              </div>

              {confirmed && (
                <div className="mt-6 rounded-xl border border-lime-200 bg-lime-50 p-4 text-sm text-lime-800">
                  ✅ Booking confirmed (frontend demo). <button className="ml-2 underline" onClick={resetAll}>Create another</button>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={back}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-600 px-6 py-3 text-sm font-bold text-white hover:bg-gray-700"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setConfirmed(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-600 px-6 py-3 text-sm font-bold text-white hover:bg-lime-700"
                >
                  Confirm Booking <span>✓</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
