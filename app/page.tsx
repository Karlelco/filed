'use client';
import React from 'react';
import Head from 'next/head';
import logo from '@/app/assets/image.png'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { motion } from 'framer-motion';


export default function Home() {
  return (
    <div className="flex flex-col py-10 items-center justify-center min-h-screen bg-base-300">
      <Head>
        <title>FileStore - Store and Manage Any File Type</title>
        <meta
          name="description"
          content="FileStore - Store and Manage Any File Type"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col  px-10 md:px-24 space-y-10">
        <header className="flex  items-center justify-between">
          <h1>
            <span className="text-3xl md:text-6xl font-bold">FileStore</span>
          </h1>
          <nav className="flex gap-2">
            <Button className="">
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary">
              <RegisterLink>Get Started</RegisterLink>
            </Button>
          </nav>
        </header>

        <div className="flex flex-col md:flex-row gap-10 items-center space-y-10">
          <Image
            src={logo}
            alt="FileStore Logo"
            width={400}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-4 space-y-8 text-center justify-center items-center">
            <div>
              <h1 className="text-3xl md:text-6xl font-bold">
                Welcome to FileStore
              </h1>
              <p className="text-center">
                FileStore is a file storage and management app for all file
                types. Store, organize, and access your files from anywhere.
              </p>
              <AvatarGroup isBordered max={3} total={10} className="py-6">
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  variant="outline"
                  className="bg-blue-800 justify-center items-center rounded-full"
                >
                  <RegisterLink>Get Started</RegisterLink>
                </Button>
              </motion.div>
            </div>
            <p>Get started today and take control of your files!</p>
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <p>&copy; 2024 FileStore</p>
      </footer>
    </div>
  );
};


