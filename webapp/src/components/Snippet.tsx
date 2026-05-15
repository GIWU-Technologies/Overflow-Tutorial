'use client';

import { Button, Tooltip } from "@heroui/react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/util";
import {CopyButton} from "next/dist/next-devtools/dev-overlay/components/copy-button";
import {CheckIcon, ClipboardIcon} from "@heroicons/react/24/outline"; // or your cn utility

interface SnippetProps {
    children: string | string[];
    symbol?: string | ReactNode;
    variant?: "flat" | "solid" | "bordered" | "shadow";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    hideSymbol?: boolean;
    hideCopyButton?: boolean;
    disableCopy?: boolean;
    disableTooltip?: boolean;
    className?: string;
    codeString?: string;
    onCopy?: (value: string) => void;
}

const variantClasses = {
    flat: "bg-default-100",
    solid: "bg-default-200",
    bordered: "border border-default-200 bg-transparent",
    shadow: "bg-default-100 shadow-sm",
};

const colorClasses = {
    default: "text-default-foreground",
    primary: "text-accent",
    secondary: "text-default-600",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};

const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
};

const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

export function Snippet({
                            children,
                            symbol = "$",
                            variant = "flat",
                            color = "default",
                            size = "md",
                            radius = "md",
                            hideSymbol = false,
                            hideCopyButton = false,
                            disableCopy = false,
                            disableTooltip = false,
                            className,
                            codeString,
                            onCopy,
                        }: SnippetProps) {
    const [copied, setCopied] = useState(false);
    const isMultiLine = Array.isArray(children);
    const lines = isMultiLine ? children : [children];
    const textToCopy = codeString || (isMultiLine ? lines.join("\n") : String(children));

    const handleCopy = async () => {
        if (disableCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            onCopy?.(textToCopy);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    const symbolElement = hideSymbol ? null : (
        <span className={cn("text-default-500", colorClasses[color], "opacity-60")}>
      {symbol}{typeof symbol === "string" ? " " : ""}
    </span>
    );

    const copyButton = hideCopyButton ? null : (
        <Tooltip isDisabled={disableTooltip || disableCopy}>
            <Button
                isIconOnly
                aria-label="Copy"
                size="sm"
                variant="ghost"
                onPress={handleCopy}
                isDisabled={disableCopy}
                className="shrink-0"
            >
                {copied ? (
                    // <span className="text-success">✓</span>
                    <span className="text-success"><CheckIcon className="h-6 w-6 text-success" /></span>
                ) : (
                    // <span>📋</span>
                    <span><ClipboardIcon className="h-6 w-6 text-sky-700 dark:text-sky-400" aria-hidden="true" /></span>
                )}
            </Button>
            <Tooltip.Content>{copied ? "Copied!" : "Copy to clipboard"}</Tooltip.Content>
        </Tooltip>
    );

    return (
        <div
            className={cn(
                "flex items-start gap-2 font-mono",
                variantClasses[variant],
                sizeClasses[size],
                radiusClasses[radius],
                className
            )}
        >
            <div className="flex-1 min-w-0">
                {isMultiLine ? (
                    <div className="space-y-1">
                        {lines.map((line, index) => (
                            <pre key={index} className={cn("m-0 text-wrap whitespace-pre-wrap break-all", colorClasses[color])}>
                                {symbolElement}
                                {line}
                            </pre>
                        ))}
                    </div>
                ) : (
                    <pre className={cn("m-0 text-wrap whitespace-pre-wrap break-all", colorClasses[color])}>
                        {symbolElement}
                        {children}
                    </pre>
                )}
            </div>
            {copyButton}
        </div>
    );
}

// // Usage
// <Snippet
//     symbol="$"
//     variant="bordered"
//     color="primary"
//     size="md"
// >
//     npm install @heroui/react
// </Snippet>