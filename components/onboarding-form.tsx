"use client";

import { FormEvent } from "react";

import { onboarding } from "@/content/site";

export function OnboardingForm() {
  const form = onboarding.form;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form
      className="soft grid grid-cols-1 gap-x-3.5 gap-y-[18px] rounded-[26px] p-[clamp(20px,3vw,36px)] sm:grid-cols-2"
      aria-labelledby="on-t"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2">
        <label className="lbl" htmlFor="c-n">
          {form.name}
        </label>
        <input
          id="c-n"
          name="name"
          className="inp"
          autoComplete="name"
          placeholder={form.namePlaceholder}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="lbl" htmlFor="c-e">
          {form.email}
        </label>
        <input
          id="c-e"
          name="email"
          type="email"
          className="inp"
          autoComplete="email"
          spellCheck={false}
          placeholder={form.emailPlaceholder}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="lbl" htmlFor="c-s">
          {form.seat}
        </label>
        <select id="c-s" name="seat" className="inp">
          {form.seats.map((seat) => (
            <option key={seat}>{seat}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="lbl" htmlFor="c-y">
          {form.system}
        </label>
        <input
          id="c-y"
          name="system"
          className="inp"
          placeholder={form.systemPlaceholder}
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label className="lbl" htmlFor="c-r">
          {form.reason}
        </label>
        <textarea
          id="c-r"
          name="reason"
          className="inp py-3.5"
          rows={3}
          aria-describedby="c-r-h"
          placeholder={form.reasonPlaceholder}
        />
        <span id="c-r-h" className="text-[13px] text-ink-soft">
          {form.reasonHint}
        </span>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-p w-full sm:w-auto">
          {form.submit}
        </button>
      </div>
    </form>
  );
}
