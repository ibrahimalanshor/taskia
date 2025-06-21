<script setup>
import BaseContainer from './components/base/base-container.vue';
</script>

<template>
  <base-container class="py-10 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-3xl">
        Task List
      </h1>
      <button>New Task</button>
    </div>

    <table class="w-full border">
      <thead>
        <tr>
          <th class="text-left border border-gray-900 py-2 px-2.5">
            Name
          </th>
          <th class="text-left border border-gray-900 py-2 px-2.5">
            Deadline
          </th>
          <th class="text-left border border-gray-900 py-2 px-2.5">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Setup linter
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Setup tailwind
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Home page
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Task table
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Task table from store
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Store task
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Edit task
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Delete task
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td class="border border-gray-900 py-2 px-2.5">
            Update task status
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            22 June 2025
          </td>
          <td class="border border-gray-900 py-2 px-2.5">
            <select>
              <option
                value=""
                selected
              >
                To Do
              </option>
              <option
                value=""
                selected
              >
                In Progress
              </option>
              <option
                value=""
                selected
              >
                Done
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </base-container>
</template>
