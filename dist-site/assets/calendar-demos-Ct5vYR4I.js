var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/calendar/calendar.css';
import '@primitives/icon/icon.css';

import { Calendar } from '@primitives/calendar/Calendar';

// ---- Basic Demo ----
function BasicDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Section title="Basic" desc="Controlled date selection. The selected date is shown below.">
      <DemoRow label="calendar">
        <Calendar value={date} onChange={setDate} />
      </DemoRow>
      <DemoRow label="selected">
        <span>{date ? date.toDateString() : 'None'}</span>
      </DemoRow>
    </Section>
  );
}

// ---- Min/Max Demo ----
function MinMaxDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  return (
    <Section title="Min / Max Date" desc="Only dates within a +/- 7 day range are selectable.">
      <DemoRow label="restricted">
        <Calendar value={date} onChange={setDate} minDate={minDate} maxDate={maxDate} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Calendar component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>Date</td><td>--</td><td>Currently selected date</td></tr>
          <tr><td><code>onChange</code></td><td>(date: Date) =&gt; void</td><td>--</td><td>Callback when a date is selected</td></tr>
          <tr><td><code>minDate</code></td><td>Date</td><td>--</td><td>Earliest selectable date</td></tr>
          <tr><td><code>maxDate</code></td><td>Date</td><td>--</td><td>Latest selectable date</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CalendarDemos() {
  return (
    <>
      <BasicDemo />
      <MinMaxDemo />
      <PropsTable />
    </>
  );
}

export default CalendarDemos;
`;export{e as default};