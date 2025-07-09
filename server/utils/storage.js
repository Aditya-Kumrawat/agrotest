"use strict";
// import { supabase } from '../config/supabase'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToStorage = uploadImageToStorage;
exports.deleteImageFromStorage = deleteImageFromStorage;
exports.getPublicUrl = getPublicUrl;
function uploadImageToStorage(bucket, fileName, fileBuffer, contentType) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Replace with S3/local storage logic
        throw new Error('Not implemented: uploadImageToStorage');
    });
}
function deleteImageFromStorage(bucket, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Replace with S3/local storage logic
        throw new Error('Not implemented: deleteImageFromStorage');
    });
}
function getPublicUrl(bucket, fileName) {
    // TODO: Replace with S3/local storage logic
    return '';
}
