import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';

import cron from 'node-cron';

const app = express();
