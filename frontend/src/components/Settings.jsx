import { useState } from "react";
import toast from "react-hot-toast";

const Settings = ({ onSave }) => {
  const [form, setForm] = useState({ nBack: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    toast.success("Settings applied!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-56 max-w-md border p-6 ml-28">
        <legend className="fieldset-legend text-lg">Settings</legend>

        <label className="label text-md">n-Back</label>
        <select name="nBack" value={form.nBack} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>

        <button type="submit" className="btn btn-ghost bg-blue-500 rounded-md">
          Apply
        </button>
      </fieldset>
    </form>
  );
};

export default Settings;
