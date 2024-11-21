<!-- 富文本编辑组件 -->
<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
    <div class="editor__footer">
      <div :class="`editor__status editor__status--${status}`">
        <template v-if="status === 'connected'">
          {{ editor.storage.collaborationCursor.users.length }} user{{
            editor.storage.collaborationCursor.users.length === 1 ? '' : 's'
          }}
          online in {{ room }}
        </template>
        <template v-else> offline </template>
      </div>
      <div class="editor__name">
        <button @click="setName">
          {{ currentUser.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { HocuspocusProvider } from '@hocuspocus/provider';
import CharacterCount from '@tiptap/extension-character-count';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Highlight from '@tiptap/extension-highlight';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3';
import * as Y from 'yjs';

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getRandomRoom = () => {
  const roomNumbers = variables.collabRooms?.trim()?.split(',') ?? [10, 11, 12];

  return getRandomElement(roomNumbers.map((number) => `rooms.${number}`));
};
const provider = ref(null);
const editor = ref(null);
const status = ref('connecting');
const room = ref(getRandomRoom());

const props = defineProps({
  goods_desc: {
    type: String,
  },
});
onMounted(() => {
  const ydoc = new Y.Doc();

  this.provider = new HocuspocusProvider({
    url: 'wss://connect.hocuspocus.cloud',
    parameters: {
      key: 'write_bqgvQ3Zwl34V4Nxt43zR',
    },
    name: this.room,
    document: ydoc,
  });

  this.provider.on('status', (event) => {
    this.status = event.status;
  });

  this.editor = new Editor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: this.provider,
        user: this.currentUser,
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
  });

  localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
});
</script>
<style></style>
