"use client";
import { useEffect } from "react";
export default function ErrorWrapper({ error, reset }: { error: Error; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <div className="container-luxury py-28"><p className="text-center text-white/70">Something went wrong loading this story. <button onClick={() => reset()} className="underline">Try again</button></p></div>; }
