// services/projectService.js
import { db, storage } from './firebase';
import { collection, addDoc, updateDoc, getDoc, getDocs, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const projectService = {
    async saveProject(project) {
        try {
            const thumbnail = await this.generateThumbnail(project.countertops);
            const projectData = {
                ...project,
                thumbnail,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const docRef = await addDoc(collection(db, 'projects'), projectData);
            return docRef.id;
        } catch (error) {
            console.error('Error saving project:', error);
            throw error;
        }
    },

    async loadProject(projectId) {
        try {
            const docRef = doc(db, 'projects', projectId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            }
            throw new Error('Project not found');
        } catch (error) {
            console.error('Error loading project:', error);
            throw error;
        }
    },

    async updateProject(projectId, updates) {
        try {
            const docRef = doc(db, 'projects', projectId);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },

    async getUserProjects() {
        try {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting projects:', error);
            throw error;
        }
    },

    async generateThumbnail(countertops) {
        // Canvas'ı thumbnail olarak kaydet
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const thumbnail = canvas.toDataURL('image/jpeg', 0.5);
            const storageRef = ref(storage, `thumbnails/${Date.now()}.jpg`);
            const response = await fetch(thumbnail);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);
            return await getDownloadURL(storageRef);
        }
        return null;
    }
};
