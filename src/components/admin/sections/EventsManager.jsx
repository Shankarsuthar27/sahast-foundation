import React, { useState } from 'react';
import {
  Plus,
  CalendarDays,
  Search,
  MapPin,
  Clock,
  Video,
  User,
  Phone,
  Edit2,
  Copy,
  Trash2,
  ExternalLink,
  X,
  Save,
  Upload,
  AlertCircle,
  Radio,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useCms } from '../../../context/CmsContext';
import { uploadImageToStorage } from '../../../firebase/services';

const STATUS_OPTIONS = ['Upcoming', 'Ongoing', 'Completed'];

export default function EventsManager() {
  const { eventsList, addEvent, updateEvent, deleteEvent, duplicateEvent } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timing, setTiming] = useState('02:00 PM - 06:00 PM Daily');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [organizerContact, setOrganizerContact] = useState('');
  const [liveStreamUrl, setLiveStreamUrl] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [featuredImage, setFeaturedImage] = useState('/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg');
  const [isUploading, setIsUploading] = useState(false);

  // Open modal for add or edit
  const openModal = (eventToEdit = null) => {
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setTitle(eventToEdit.title || '');
      setSlug(eventToEdit.slug || '');
      setStartDate(eventToEdit.startDate || '');
      setEndDate(eventToEdit.endDate || '');
      setTiming(eventToEdit.timing || '02:00 PM - 06:00 PM Daily');
      setVenue(eventToEdit.venue || '');
      setLocation(eventToEdit.location || '');
      setGoogleMapsUrl(eventToEdit.googleMapsUrl || '');
      setOrganizerContact(eventToEdit.organizerContact || '');
      setLiveStreamUrl(eventToEdit.liveStreamUrl || '');
      setStatus(eventToEdit.status || 'upcoming');
      setFeaturedImage(eventToEdit.featuredImage || '/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg');
    } else {
      setEditingEvent(null);
      setTitle('');
      setSlug('');
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]);
      setTiming('02:00 PM - 06:00 PM Daily');
      setVenue('Sadguru Trikam Das Ji Dham');
      setLocation('Takhatgarh, Pali, Rajasthan');
      setGoogleMapsUrl('https://maps.google.com/?q=Takhatgarh,Rajasthan');
      setOrganizerContact('Shri Guru Puram Trust (+91 8696298489)');
      setLiveStreamUrl('https://youtube.com/live/shreeabhaydas');
      setStatus('upcoming');
      setFeaturedImage('/home-page-image/WhatsApp-Image-2026-05-28-at-13.31.06-e1779955352658.jpeg');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!editingEvent) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadImageToStorage(file, 'events');
      setFeaturedImage(url);
    } catch (err) {
      alert(`Image upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Event title is required');
      return;
    }

    const payload = {
      title,
      slug: slug || 'event',
      startDate,
      endDate,
      timing,
      venue,
      location,
      googleMapsUrl,
      organizerContact,
      liveStreamUrl,
      status,
      featuredImage
    };

    if (editingEvent) {
      await updateEvent(editingEvent.id, payload);
    } else {
      await addEvent(payload);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setDeleteConfirmId(null);
  };

  // Filter events
  const filteredEvents = eventsList.filter((event) => {
    const matchesStatus =
      statusFilter === 'All' || event.status?.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Spiritual Events & Yatras Manager
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full">
              {eventsList.length} Scheduled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Schedule 7-day kathas, spiritual yatras, live broadcast links, and venue directions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title, venue, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c] transition-all"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold self-start md:self-auto">
          {['All', 'Upcoming', 'Ongoing', 'Completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvents.map((event) => {
            const isLiveStreaming = Boolean(event.liveStreamUrl);

            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Event Image Banner */}
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  <img
                    src={event.featuredImage || '/home-page-image/guruji-1.jpeg'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Status Flag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 backdrop-blur-md shadow-xs ${
                        event.status === 'ongoing'
                          ? 'bg-orange-600/90 text-white'
                          : event.status === 'upcoming'
                          ? 'bg-emerald-700/90 text-white'
                          : 'bg-slate-700/90 text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          event.status === 'ongoing'
                            ? 'bg-white animate-ping'
                            : 'bg-white'
                        }`}
                      />
                      <span className="capitalize">{event.status || 'upcoming'}</span>
                    </span>
                  </div>

                  {/* YouTube Live Indicator */}
                  {isLiveStreaming && (
                    <div className="absolute top-3 right-3">
                      <a
                        href={event.liveStreamUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-xs transition-colors shadow-sm"
                      >
                        <Radio size={12} className="animate-pulse" />
                        <span>YouTube Live</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Event Details Card */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                      <CalendarDays size={14} />
                      <span>
                        {event.startDate || 'TBA'}
                        {event.endDate && event.endDate !== event.startDate
                          ? ` — ${event.endDate}`
                          : ''}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      {event.timing && (
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-slate-400 shrink-0" />
                          <span>{event.timing}</span>
                        </div>
                      )}

                      {(event.venue || event.location) && (
                        <div className="flex items-start gap-2">
                          <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-bold text-slate-800">{event.venue}</span>
                            {event.location && (
                              <span className="text-slate-500"> • {event.location}</span>
                            )}
                            {event.googleMapsUrl && (
                              <a
                                href={event.googleMapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-orange-600 hover:underline ml-2 font-semibold"
                              >
                                Maps <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {event.organizerContact && (
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <User size={13} className="text-slate-400 shrink-0" />
                          <span>Host: {event.organizerContact}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      /event/{event.slug || 'takhatgarh'}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => duplicateEvent(event.id)}
                        title="Duplicate"
                        className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Copy size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(event)}
                        title="Edit Event"
                        className="p-1.5 text-slate-500 hover:text-[#0f382c] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(event.id)}
                        title="Delete Event"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <CalendarDays size={36} className="text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No events found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Click "+ Schedule New Event" to create a katha discourse or yatra.
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete this Event?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete this event schedule from the portal?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editingEvent ? 'Edit Spiritual Event' : 'Schedule New Event'}
                </h3>
                <p className="text-xs text-slate-500">
                  Configure Katha dates, venue details, and YouTube live broadcast
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="e.g. 7-Day Shrimad Bhagwat Katha Gyan Yagna"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>
              </div>

              {/* Timing & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Daily Timings
                  </label>
                  <input
                    type="text"
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    placeholder="02:00 PM - 06:00 PM Daily"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Status Flag
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none focus:border-[#0f382c]"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing (Active Now)</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Venue & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Sadguru Trikam Das Ji Dham"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Location / Address
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Takhatgarh, Pali, Rajasthan"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>
              </div>

              {/* Maps & Live Stream Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Google Maps Link
                  </label>
                  <input
                    type="text"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    YouTube Live Stream URL
                  </label>
                  <input
                    type="text"
                    value={liveStreamUrl}
                    onChange={(e) => setLiveStreamUrl(e.target.value)}
                    placeholder="https://youtube.com/live/..."
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                  />
                </div>
              </div>

              {/* Organizer Contact */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Chief Organizer / Host Contact Details
                </label>
                <input
                  type="text"
                  value={organizerContact}
                  onChange={(e) => setOrganizerContact(e.target.value)}
                  placeholder="e.g. Shri Guru Puram Trust (+91 8696298489)"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#0f382c]"
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Featured Event Banner Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                  <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Upload size={14} />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Save size={15} />
                  <span>{editingEvent ? 'Save Changes' : 'Publish Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
