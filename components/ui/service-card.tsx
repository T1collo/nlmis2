"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex w-full flex-col justify-between overflow-hidden rounded-[22px] p-6 shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg",
  {
    variants: {
      variant: {
        primary: "bg-[#22539B] text-white",
        teal: "bg-[#2F8A92] text-white",
        ink: "bg-[#10243D] text-white",
        soft: "bg-white text-[#10243D]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ServiceCardProps extends VariantProps<typeof cardVariants> {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  description?: string;
  className?: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, href, imgSrc, imgAlt, description }, ref) => {
    const cardAnimation = {
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.1,
        rotate: 3,
        x: 10,
        transition: { duration: 0.4, ease: "easeInOut" as const },
      },
    };

    const arrowAnimation = {
      hover: {
        x: 5,
        transition: {
          duration: 0.3,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      },
    };

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
      >
        <div className="relative z-10 flex h-full min-h-0 flex-col pr-28">
          <h3 className="disp text-2xl font-semibold tracking-[-0.02em]">
            {title}
          </h3>
          {description ? (
            <p
              className={cn(
                "mt-2 max-w-[18rem] text-[15px] leading-snug",
                variant === "soft" ? "text-ink-muted" : "text-white/75",
              )}
            >
              {description}
            </p>
          ) : null}
          <Link
            href={href}
            aria-label={`Learn more about ${title}`}
            className={cn(
              "mt-auto flex items-center pt-6 text-xs font-semibold tracking-[0.12em] uppercase no-underline hover:underline",
              // Beat global `a { color: primary }` (same blue as the card → invisible).
              variant === "soft"
                ? "!text-[#10243D] hover:!text-[#10243D]"
                : "!text-white hover:!text-white",
            )}
          >
            Learn more
            <motion.span variants={arrowAnimation} className="inline-flex">
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </motion.span>
          </Link>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src={imgSrc}
          alt={imgAlt}
          className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 object-contain opacity-90 group-hover:opacity-100"
          variants={imageAnimation}
        />
      </motion.div>
    );
  },
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
