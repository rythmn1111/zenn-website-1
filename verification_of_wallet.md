# What to expect from this doc?

This document does not go deep into how the overall hardware wallet works but rather focused on how the hardware wallet is verifiable, so the discussions are more concentrated and questions from you are more to the point.

# Terminologies to Know Before We Begin

Before diving into how the wallet works, it helps to understand a few hardware terms.

## 1) **Secure Boot**

Secure Boot makes sure the device only runs software that is approved or signed by a particular entity, Secure Boot makes sure no one that does not has a specific signature can upload or update the firmware.

**Why it matters:**

Without Secure Boot, someone could:

- replace the firmware
- insert malicious code
- trick the device into running something else

With Secure Boot enabled:

- the device won’t run modified or unsigned firmware
- the boot process cannot be silently hijacked

**In our wallet:**

Secure Boot ensures that once firmware is approved and locked, the device cannot later be forced to run unapproved code.

## 2) Flash Encryption

Flash Encryption scrambles everything stored inside the device so it cannot be read directly. Basically Flash Encryption is an Encryption that is applied silicon wise and even on RAM.

**Think of it like this:**

Flash Encryption is like storing all internal data in a locked safe.

- Even if someone removes the storage chip
- or physically reads the memory
- all they see is unreadable garbage

Flash Encryption also protects against, on the fly memory attacks.

Without Flash Encryption:

- secrets stored in memory could be copied
- keys could be cloned
- device identity could be stolen

With Flash Encryption:

- secrets are bound to the physical device
- copying memory does not copy identity

**In our wallet:**

Flash Encryption is enabled **after** the user verifies firmware and registers the device.

This locks the verified state in place and protects wallet secrets going forward. You will read about this in later section.

## 3) eFuse Burn

**What it means (in simple terms):**

An eFuse is a tiny, one-time programmable switch inside the chip.

When an eFuse is “burned”:

- it permanently changes state
- it cannot be undone
- it survives resets, power loss, and firmware updates

**Think of it like this:**

Burning an eFuse is like snapping off a physical switch inside the chip.

Once it’s snapped:

- there is no software command that can turn it back on
- even the manufacturer can’t reverse it

**What eFuses are used for:**

- enabling Secure Boot permanently
- enabling Flash Encryption permanently
- marking a device as “locked” or “registered”

**Why it matters:**

eFuses prevent rollback attacks, such as:

- disabling encryption later
- re-entering setup mode
- replacing firmware after identity creation

**In our wallet:**

eFuses are used to permanently:

- lock the device after registration
- ensure security settings cannot be undone
- guarantee that the verified and registered state is final

---

# How our hardware wallet is verifiable?

Making hardware verifiable is an 3 step process, we would go deep into every step.

1. What “Verifiable” Means in This Wallet

This hardware wallet is “verifiable” because a user can independently confirm using open, reproducible processes that:

- **The firmware running on the device is exactly the firmware they intended** (not modified, not backdoored).
- **The device’s cryptographic identity is created only after that verification**, and is permanently tied to that verified state.
- **The device is locked immediately after registration** using hardware protections so the verified state cannot be silently changed later.
- The verification process is **auditable end-to-end**:
    - the website is open and permanently hosted on Arweave, advantage of this is that even the website that is serving the main function of verifying things itself can be verified.
    - the firmware source and corresponding binaries are anchored in an AO firmware registry
    - the device registration record is anchored in AO

The core principle is:

> Verify code first, create identity second, lock hardware third.
> 
> 
> This prevents “malicious firmware owning the identity.” 
> 
> Even tools using for verifying and registering the identity can be verified themselves as they are on Arweave and AO.
> 

## 2. Components Overview

### 2.1 Hardware Architecture

The wallet uses two ESP32-S3 chips:

- **Vault ESP32-S3 (Security Domain)**
    - Generates and stores Arweave wallet secrets (private keys)
    - Encrypts secrets under user credentials (PIN/passphrase)
    - Performs signing operations internally
    - Never exposes private keys externally
    - Flash Encrypted.
- **Interface ESP32-S3 (UI/IO Domain)**
    - Camera (QR scan)
    - Display (QR render)
    - User input and interaction
    - Communication with website (via QR/USB/etc.)
    - Sends requests to vault (e.g., “sign this”), receives signatures/public info
    - Flash Encrypted.

### 2.2 Web Verification Client

Before User uses the hardware wallet, they can verify that firmware that is running on the Hardware is the right one and which firmware is running. IMP : In this stage the flash encryption is not enabled, so user can read the memory and confirm the firmware, also without flash encryption keys are not generated. A user interacts with an **open-source website hosted on Arweave**. Since it is stored on Arweave, the exact web code is publicly inspectable and can be pinned to immutable content identifiers. Users can self-host or locally run the same code if they want.

### 2.3 AO Firmware Registry

An AO-based firmware registry stores:

- Firmware **source code**
- The **build process** (how to produce a binary from the source)
- The resulting firmware **binary**
- Firmware **hash(es)** and metadata

This allows verification through either:

- trusting the registry’s published binary hash, or
- reproducing the binary from source independently and comparing.

### 2.4 AO Device Registration Registry

A separate AO table stores:

- device public key (device identity)
- registration challenge (nonce, context)
- signature proving the device generated the identity
- firmware hash used during registration

This provides a permanent, public record of device registration and the verified firmware state at registration time.

---

## 3. Step 1: Firmware Verification (Before Any Keys Exist)

### 3.1 Starting Device State

On first boot / initial setup:

- **Secure Boot: ON**
- **Flash Encryption: OFF**
- **No device identity key exists yet**
- **No Arweave wallet keys exist yet**

This is intentional: the device is in a transparent inspection state before becoming “owned”.

### 3.2 Verification Goal

The user must be able to answer:

> “Is the device running exactly the firmware I expect?”
> 

### 3.3 Verification Mechanism

1. User visits the Arweave-hosted verification website.
2. User plugs in / connects the device (or otherwise interfaces).
3. The website reads the firmware binary (or firmware hash) from the device.
4. The website fetches the expected firmware binary (or hash) from the AO firmware registry.
5. A comparison is performed:
    - **device firmware == registry firmware**

If it matches, the user has cryptographic confirmation that the device is running the published firmware.

### 3.4 Trust-Minimized Option

If the user distrusts any part of the system (the registry, the website, or the vendor), they can:

- download firmware source code
- build the binary independently
- read the device binary using independent tooling
- compare locally

This makes Step 1 verifiable even under a “trust nobody” model.

### 3.5 Why Secure Boot Matters Here

Secure boot helps ensure that the device is not booting arbitrary unsigned firmware. Combined with the explicit binary comparison, the user can verify both:

- “what firmware is currently present”
- “that it is the expected firmware, not a modified fork”

---

## 4. Step 2: Device Registration (Identity Created After Verification)

### 4.1 Goal

After the user has verified the firmware, they register the device so that:

- the device gets a cryptographic identity
- that identity is publicly recorded on AO
- the identity is bound to the verified firmware hash

### 4.2 Why Identity Is Not Pre-Installed

If a vendor pre-installs keys, the user cannot be sure the vendor (or attacker) didn’t copy them.

This wallet flips the model:

> The user creates the device identity themselves, after verifying firmware.
> 

### 4.3 Registration Challenge

The website generates a one-time registration challenge (QR):

Example fields:

- `purpose`: `"device-registration"`
- `nonce`: random unique value
- `timestamp`: current time
- `firmware_hash`: hash of firmware verified in Step 1

The device scans the QR and shows the challenge to the user on-screen for confirmation.

### 4.4 Identity Creation and Signature

After user confirmation, the device:

1. generates a device private key (kept secret)
2. derives a device public key (shareable)
3. signs the registration statement:

`signature = SIGN(device_private_key, purpose || nonce || timestamp || firmware_hash)`

### 4.5 Registration Proof Returned to Website

The device displays a response QR containing:

- device public key
- the challenge fields (nonce, firmware hash, etc.)
- the signature

### 4.6 AO Registration Record

The website verifies the signature (using the public key) and then writes to AO:

- `device_id` (e.g., hash of public key)
- `public_key`
- `firmware_hash`
- `nonce`
- `signature`
- `registered_at`

### 4.7 Why Replay Does Not Work Here

A fake device cannot “replay” the registration later because registration is a **one-time challenge**. Even if registration data is public, it is not proof of current possession. Future checks must require fresh challenges (see below).

---

## 5. Step 3: Locking the Device (Flash Encryption After Registration)

### 5.1 Goal

Immediately after successful registration, the device becomes tamper-resistant:

- secrets and internal state become difficult/impossible to extract
- the identity key cannot be swapped or replaced
- firmware state cannot be silently altered while keeping identity

### 5.2 Mechanism

Right after registration completes, the device:

- enables **Flash Encryption**
- marks itself as **locked**
- reboots into operational mode

The system transitions from “transparent setup” → “secure wallet”.

### 5.3 Why Flash Encryption Is Delayed Until After Verification

If flash encryption were enabled from factory:

- a user would have difficulty auditing what is running
- verification could become trust-based instead of proof-based

By delaying encryption until after Step 1 and Step 2:

- the user verifies the firmware first
- the user then creates identity
- the device then locks, preserving that verified state

---

## 6. Operational Verification: Proving “I Am That Device” Later

Even though the logs are public, **public logs are not enough to prove possession**. To prove a device is the same one later, you use a fresh challenge.

### 6.1 Fresh Challenge-Response

At any time after registration:

1. Verifier reads `public_key` from AO for a target `device_id`
2. Verifier generates a new random challenge:
    - `nonce_2`
    - `timestamp_2`
    - `purpose`: `"proof-of-possession"`
3. Device signs it:
    - `sig_2 = SIGN(device_private_key, nonce_2 || timestamp_2 || purpose)`
4. Verifier checks signature using public key from AO.

This proves:

> “This physical device currently possesses the same private key that registered earlier.”
> 

### 6.2 Why Replay Devices Fail

A replay-only fake device can copy old AO data, but it cannot sign a **new** challenge it has never seen. Therefore it cannot prove possession.

---

## 7. Why This Is “Verifiable” Compared to Typical Wallets

Most hardware wallets require trusting the vendor that:

- firmware is what they say it is
- keys were not copied
- production wasn’t compromised

This design reduces those trust requirements by giving users:

- a reproducible firmware verification path
- a visible, auditable registration ceremony
- an AO-backed immutable registry of both firmware and identity binding
- a locked operational mode only after verification and identity creation
