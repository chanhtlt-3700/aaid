"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Avatar } from "@/components/kudos/Avatar";
import { mockKudoUsers } from "@/components/kudos/mockKudoUsers";
import { hashtagOptions } from "@/components/kudos/hashtagOptions";
import type { KudoUser } from "@/components/kudos/mockKudos";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const MAX_HASHTAGS = 5;
const MAX_IMAGES = 5;
const MAX_CONTENT = 600;

type UploadedImage = { file: File; url: string };

export function WriteKudoModal({ isOpen, onClose }: Props) {
	const { t } = useLanguage();
	const titleId = useId();
	const backdropRef = useRef<HTMLDivElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);

	const [recipients, setRecipients] = useState<KudoUser[]>([]);
	const [recipientQuery, setRecipientQuery] = useState("");
	const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
	const [content, setContent] = useState("");
	const [hashtags, setHashtags] = useState<string[]>([]);
	const [showHashtagDropdown, setShowHashtagDropdown] = useState(false);
	const [images, setImages] = useState<UploadedImage[]>([]);
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [anonymousName, setAnonymousName] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const reset = useCallback(() => {
		images.forEach((img) => URL.revokeObjectURL(img.url));
		setRecipients([]);
		setRecipientQuery("");
		setShowRecipientDropdown(false);
		setContent("");
		setHashtags([]);
		setShowHashtagDropdown(false);
		setImages([]);
		setIsAnonymous(false);
		setAnonymousName("");
	}, [images]);

	const handleClose = useCallback(() => {
		reset();
		onClose();
	}, [reset, onClose]);

	useEffect(() => {
		if (!isOpen) return;
		const previous = document.activeElement as HTMLElement | null;
		dialogRef.current?.focus();
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") handleClose();
		}
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
			previous?.focus();
		};
	}, [isOpen, handleClose]);

	useEffect(() => {
		return () => {
			images.forEach((img) => URL.revokeObjectURL(img.url));
		};
	}, [images]);

	if (!isOpen) return null;

	const recipientMatches = recipientQuery
		? mockKudoUsers.filter(
				(u) =>
					!recipients.some((r) => r.id === u.id) &&
					u.name.toLowerCase().includes(recipientQuery.toLowerCase()),
			)
		: mockKudoUsers.filter((u) => !recipients.some((r) => r.id === u.id));

	const addRecipient = (u: KudoUser) => {
		setRecipients((prev) => [...prev, u]);
		setRecipientQuery("");
		setShowRecipientDropdown(false);
	};

	const removeRecipient = (id: string) => {
		setRecipients((prev) => prev.filter((u) => u.id !== id));
	};

	const addHashtag = (tag: string) => {
		if (hashtags.length >= MAX_HASHTAGS || hashtags.includes(tag)) return;
		setHashtags((prev) => [...prev, tag]);
		setShowHashtagDropdown(false);
	};

	const removeHashtag = (tag: string) => {
		setHashtags((prev) => prev.filter((t) => t !== tag));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
		const available = MAX_IMAGES - images.length;
		const next = files.slice(0, available).map((file) => ({
			file,
			url: URL.createObjectURL(file),
		}));
		setImages((prev) => [...prev, ...next]);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const removeImage = (idx: number) => {
		setImages((prev) => {
			const target = prev[idx];
			if (target) URL.revokeObjectURL(target.url);
			return prev.filter((_, i) => i !== idx);
		});
	};

	const canSubmit =
		recipients.length > 0 && content.trim().length > 0 && hashtags.length > 0;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!canSubmit) {
			window.alert(t.writeKudoModal.validationMissing);
			return;
		}

		const payload = {
			recipients: recipients.map((r) => r.id),
			content,
			hashtags,
			imageCount: images.length,
			isAnonymous,
			anonymousName: isAnonymous ? anonymousName.trim() : null,
			submittedAt: new Date().toISOString(),
		};
		console.info("[Kudo MVP] submit payload:", payload);
		window.alert(t.writeKudoModal.submittedAlert);
		handleClose();
	};

	const availableHashtags = hashtagOptions.filter((h) => !hashtags.includes(h));

	return (
		<div
			ref={backdropRef}
			role="presentation"
			onMouseDown={(e) => {
				if (e.target === backdropRef.current) handleClose();
			}}
			className="fixed inset-0 z-[100] flex animate-backdrop-fade items-center justify-center bg-black/60 p-0 md:p-6"
		>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				tabIndex={-1}
				className="relative flex max-h-screen w-full animate-modal-in flex-col overflow-hidden rounded-none border-[#998C5F] bg-[#00070C] shadow-[0_20px_40px_rgba(0,0,0,0.5)] md:max-h-[90vh] md:max-w-[640px] md:rounded-xl md:border"
			>
				<header className="flex items-center justify-between border-b border-[#2E3940] px-6 py-4">
					<h2
						id={titleId}
						className="font-montserrat text-lg font-bold leading-7 text-white md:text-xl"
					>
						{t.writeKudoModal.title}
					</h2>
					<button
						type="button"
						onClick={handleClose}
						aria-label={t.writeKudoModal.close}
						className="rounded p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-[#FFEA9E]"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</header>

				<form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
					<fieldset className="flex flex-col gap-2">
						<legend className="font-montserrat text-sm font-bold text-white">
							<span className="mr-1 text-[#FF6B6B]">*</span>
							{t.writeKudoModal.recipientLabel}
						</legend>
						<div className="relative">
							<input
								type="text"
								value={recipientQuery}
								onChange={(e) => {
									setRecipientQuery(e.target.value);
									setShowRecipientDropdown(true);
								}}
								onFocus={() => setShowRecipientDropdown(true)}
								placeholder={t.writeKudoModal.recipientPlaceholder}
								className="h-11 w-full rounded-lg border border-[#2E3940] bg-white/5 px-4 font-montserrat text-[15px] text-white placeholder-white/40 focus:border-[#FFEA9E] focus:outline-none"
							/>
							{showRecipientDropdown && recipientMatches.length > 0 && (
								<ul
									role="listbox"
									className="absolute left-0 right-0 top-full z-10 mt-1 max-h-56 overflow-y-auto rounded-lg border border-[#2E3940] bg-[#00070C]"
								>
									{recipientMatches.slice(0, 8).map((u) => (
										<li key={u.id}>
											<button
												type="button"
												onClick={() => addRecipient(u)}
												className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-white/10"
											>
												<Avatar initials={u.initials} size="sm" />
												<span className="flex flex-col">
													<span className="font-montserrat text-sm font-bold text-white">{u.name}</span>
													<span className="font-montserrat text-xs text-white/60">{u.department}</span>
												</span>
											</button>
										</li>
									))}
								</ul>
							)}
						</div>
						{recipients.length > 0 && (
							<ul className="flex flex-wrap gap-2">
								{recipients.map((u) => (
									<li
										key={u.id}
										className="flex items-center gap-2 rounded-full bg-[#FFEA9E]/15 px-3 py-1 font-montserrat text-xs font-bold text-[#FFEA9E]"
									>
										<Avatar initials={u.initials} size="sm" />
										{u.name}
										<button
											type="button"
											aria-label={`Remove ${u.name}`}
											onClick={() => removeRecipient(u.id)}
											className="ml-1 opacity-70 hover:opacity-100"
										>
											×
										</button>
									</li>
								))}
							</ul>
						)}
					</fieldset>

					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-1 rounded-t-lg border border-b-0 border-[#2E3940] bg-white/[0.03] px-3 py-2">
							{["B", "I", "S", "1.", "🔗", "\""].map((label) => (
								<button
									key={label}
									type="button"
									disabled
									aria-label={`Formatting ${label}`}
									className="inline-flex h-8 w-8 items-center justify-center rounded font-montserrat text-sm font-bold text-white/40"
								>
									{label}
								</button>
							))}
						</div>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value.slice(0, MAX_CONTENT))}
							placeholder={t.writeKudoModal.contentPlaceholder}
							rows={5}
							className="min-h-[140px] w-full rounded-b-lg border border-[#2E3940] bg-white/5 px-4 py-3 font-montserrat text-[15px] leading-[22px] text-white placeholder-white/40 focus:border-[#FFEA9E] focus:outline-none"
						/>
						<div className="flex items-center justify-between">
							<p className="font-montserrat text-xs text-white/50">{t.writeKudoModal.contentHint}</p>
							<p className="font-montserrat text-xs text-white/50">{content.length}/{MAX_CONTENT}</p>
						</div>
					</div>

					<fieldset className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<legend className="font-montserrat text-sm font-bold text-white">
								<span className="mr-1 text-[#FF6B6B]">*</span>
								{t.writeKudoModal.hashtagLabel}
							</legend>
							<p className="font-montserrat text-xs text-white/50">{t.writeKudoModal.maxHashtags}</p>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<div className="relative">
								<button
									type="button"
									disabled={hashtags.length >= MAX_HASHTAGS}
									onClick={() => setShowHashtagDropdown((p) => !p)}
									className="inline-flex h-9 items-center gap-1 rounded-full border border-[#998C5F] bg-[#FFEA9E]/10 px-3 font-montserrat text-xs font-bold text-[#FFEA9E] hover:bg-[#FFEA9E]/20 disabled:opacity-40"
								>
									{t.writeKudoModal.hashtagAdd}
								</button>
								{showHashtagDropdown && availableHashtags.length > 0 && (
									<ul
										role="listbox"
										className="absolute left-0 top-full z-10 mt-1 max-h-56 w-60 overflow-y-auto rounded-lg border border-[#2E3940] bg-[#00070C] p-1"
									>
										{availableHashtags.map((tag) => (
											<li key={tag}>
												<button
													type="button"
													onClick={() => addHashtag(tag)}
													className="block w-full rounded px-3 py-2 text-left font-montserrat text-xs font-bold text-[#FFEA9E] hover:bg-white/10"
												>
													#{tag}
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
							{hashtags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-1 rounded-full bg-[#FFEA9E]/15 px-3 py-1 font-montserrat text-xs font-bold text-[#FFEA9E]"
								>
									#{tag}
									<button
										type="button"
										aria-label={`Remove #${tag}`}
										onClick={() => removeHashtag(tag)}
										className="opacity-70 hover:opacity-100"
									>
										×
									</button>
								</span>
							))}
						</div>
					</fieldset>

					<fieldset className="flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<legend className="font-montserrat text-sm font-bold text-white">
								{t.writeKudoModal.imageLabel}
							</legend>
							<p className="font-montserrat text-xs text-white/50">{t.writeKudoModal.maxImages}</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							{images.length < MAX_IMAGES && (
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="inline-flex h-9 items-center gap-1 rounded-full border border-[#998C5F] bg-white/5 px-3 font-montserrat text-xs font-bold text-white/80 hover:bg-white/10"
								>
									{t.writeKudoModal.imageAdd}
								</button>
							)}
							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								multiple
								onChange={handleFileChange}
								className="hidden"
							/>
							{images.map((img, idx) => (
								<span
									key={img.url}
									className="relative inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded border border-[#2E3940] bg-black"
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src={img.url} alt="" className="h-full w-full object-cover" />
									<button
										type="button"
										aria-label="Remove image"
										onClick={() => removeImage(idx)}
										className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/80 font-bold text-white/90 hover:bg-black"
									>
										×
									</button>
								</span>
							))}
						</div>
					</fieldset>

					<fieldset className="flex flex-col gap-2">
						<label className="inline-flex cursor-pointer items-center gap-2">
							<input
								type="checkbox"
								checked={isAnonymous}
								onChange={(e) => setIsAnonymous(e.target.checked)}
								className="h-4 w-4 rounded border-[#2E3940] bg-white/5 text-[#FFEA9E] focus:ring-[#FFEA9E]"
							/>
							<span className="font-montserrat text-sm font-medium text-white">
								{t.writeKudoModal.anonymousToggle}
							</span>
						</label>
						{isAnonymous && (
							<input
								type="text"
								value={anonymousName}
								onChange={(e) => setAnonymousName(e.target.value)}
								placeholder={t.writeKudoModal.anonymousNamePlaceholder}
								className="h-10 w-full rounded-lg border border-[#2E3940] bg-white/5 px-4 font-montserrat text-sm text-white placeholder-white/40 focus:border-[#FFEA9E] focus:outline-none"
							/>
						)}
					</fieldset>
				</form>

				<footer className="flex items-center justify-end gap-3 border-t border-[#2E3940] px-6 py-4">
					<button
						type="button"
						onClick={handleClose}
						className="inline-flex h-10 items-center justify-center rounded-lg border border-[#2E3940] px-5 font-montserrat text-sm font-bold text-white transition-colors hover:bg-white/10"
					>
						{t.writeKudoModal.cancel}
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!canSubmit}
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] px-5 font-montserrat text-sm font-bold text-[#00101A] transition-colors hover:bg-[#fff8e1] disabled:cursor-not-allowed disabled:opacity-40"
					>
						{t.writeKudoModal.submit}
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
				</footer>
			</div>
		</div>
	);
}
