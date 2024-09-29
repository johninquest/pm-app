import { Injectable } from '@angular/core';
import { nanoid, customAlphabet } from 'nanoid';

@Injectable({
  providedIn: 'root',
})
export class UidService {
  constructor() {}

  generate(length: number = 21): string {
    return nanoid(length);
  }

  generateCustom(
    length: number = 21,
    alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  ): string {
    const customNanoid = customAlphabet(alphabet, length);
    return customNanoid();
  }
}
