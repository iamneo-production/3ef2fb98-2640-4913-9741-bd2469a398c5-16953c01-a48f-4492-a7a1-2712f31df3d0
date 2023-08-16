import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import IClip from '../model/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, of, combineLatest } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ClipzService {

  public clipsCollection : AngularFirestoreCollection<IClip>;
  public pageClip: IClip[] = [];
  pendingReq = false;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private store: AngularFireStorage) {
    this.clipsCollection = db.collection('clips')
   }

   createClip(data: IClip) {
      return this.clipsCollection.add(data)
   }

   getAllClips(sort: BehaviorSubject<string>) {
      return combineLatest(
        [this.auth.user, sort]
        ).pipe(
        switchMap((value) => {
          const [user, sort] = value
          if(!user) {
            return of([])
          }

          const query = this.clipsCollection.ref.where(
            "uid", '==', user.uid
          ).orderBy(
            'timestamp',
            sort === '1' ? 'desc' : 'asc'
          )

          return query.get()
        }),
        map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
      )
   }

   updateTitle(docId: string, title: string) {
    return this.clipsCollection.ref.doc(`${docId}`).update({title})
   }

   deleteClip(clip: IClip) {
    // this.store.ref(`clipz/`)
    return this.clipsCollection.ref.doc(`${clip.docId}`).delete()
   }

   async getScrollClips() {

    if(this.pendingReq) {
      return;
    }

    this.pendingReq = true;
    let query = this.clipsCollection.ref.orderBy(
      'timestamp', 'desc'
    ).limit(6);

    const { length } = this.pageClip;

    if(length) {
      const lastClip = this.pageClip[length - 1].docId;

      const lastDoc = await this.clipsCollection.doc(lastClip)
        .get()
        .toPromise()

        query = query.startAfter(lastDoc)
    }

    const snapshot = await query.get();

    snapshot.forEach(doc => {
      this.pageClip.push({
        docId: doc.id,
        ...doc.data()
      })
    })

    this.pendingReq = false;
   }
}
