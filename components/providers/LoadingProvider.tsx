"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Children,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface contextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  CutomRouter: (props: RouterProps) => JSX.Element;
}

interface RouterProps {
  children: ReactNode | ReactNode[];
  href: string;
  className: string;
  onClick?: () => void;
}

export const LoadingContext = createContext<contextProps | null>(null);

interface LoadingProps {
  children: ReactNode | ReactNode[];
}

export const LoadingProvider = (props: LoadingProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const CutomRouter = (props: RouterProps) => {
    const [isClicked, setIsClicked] = useState(false);
    const path = usePathname();

    useEffect(() => {
      if (isClicked || path == props.href) {
        setIsLoading(path != props.href);
      }
    }, [isClicked, path]);
    return (
      <Link
        href={props.href}
        className={props.className}
        onClick={() => {
          setIsClicked(true);
          props.onClick && props.onClick();
        }}
      >
        {props.children}
      </Link>
    );
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, CutomRouter }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
