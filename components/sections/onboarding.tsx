import Link from "next/link";

import { OnboardingForm } from "@/components/onboarding-form";
import { onboarding } from "@/content/site";

export function Onboarding() {
  return (
    <section
      id="onboarding"
      className="sec"
      aria-labelledby="on-t"
      style={{ paddingBottom: "clamp(96px, 10vw, 160px)" }}
    >
      <p className="tag mb-3.5 text-teal">{onboarding.eyebrow}</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] items-start gap-8 gap-x-12">
        <div className="flex flex-col gap-4">
          <h2 id="on-t" className="h2 text-display">
            {onboarding.headline[0]}{" "}
            <span className="text-teal">{onboarding.headline[1]}</span>
          </h2>
          <p className="lede m-0">{onboarding.body}</p>
          <Link
            href={onboarding.tutorials.href}
            className="soft flex max-w-[28rem] items-center gap-3 rounded-[16px] px-4 py-3.5 text-ink no-underline"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-10 items-center justify-center rounded-full bg-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M7 4l13 8-13 8z" />
              </svg>
            </span>
            <span>
              <strong className="block text-sm sm:text-base">
                {onboarding.tutorials.label}
              </strong>
              <span className="text-[13px] text-ink-soft">
                {onboarding.tutorials.note}
              </span>
            </span>
          </Link>
        </div>
        <OnboardingForm />
      </div>
    </section>
  );
}
