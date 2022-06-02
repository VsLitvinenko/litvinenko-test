import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators'
import { Question, Test } from '../interfaces/test.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private readonly auth: AngularFireAuth,
              private readonly db: AngularFirestore) { }

  public login(email: string, password: string): Promise<firebase.auth.UserCredential | null> {
    return this.catchError(this.auth.signInWithEmailAndPassword(email, password));
  }

  public getQuestion(id: number): Promise<Question | null> {
    return this.catchError<Question>(
      this.db.collection('questions').doc(id.toString()).get().pipe(
        map(res => res.data() as Question)
      ).toPromise()
    );
  }

  public getTest(id: number): Promise<Test | null> {
    return this.catchError<Test>(
      this.db.collection('tests').doc(id.toString()).get().pipe(
        map(res => res.data() as Test)
      ).toPromise()
    );
  }

  private async catchError<T>(request: Promise<T>): Promise<T | null> {
    try {
      return await request;
    }
    catch (err) {
      console.log(err);
      return null
    }
  }
}
